import qs from 'qs'
import React from 'react'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import "~/lib/zod-error-map"
import { z } from "zod"

import { setParticipantPreference } from './utils/set-participant-preference'
import { cn } from '~/lib/utils'
import { requireUser, requireUserId } from '~/session.server'
import { checkDelegationIsDelegated, getDelegationById, getDelegationStatus } from '~/models/delegation.server'

import { Info } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Item } from "./sortable"
import SortableDialog from './dialog'

export const preferenceSchema = z.object({
  councilPreference: z
    .array(
      z.object({
        council: z.string(),
        language: z.enum(["portuguese", "english", "spanish"]),
        id: z.number(),
        description: z.string()
      })
    ),
})

export type PreferenceSchema = z.infer<typeof preferenceSchema>

export type PreferenceSchemaKeys = "councilPreference" | `councilPreference.${number}` | `councilPreference.${number}.council` | `councilPreference.${number}.language` | `councilPreference.${number}.id` | `councilPreference.${number}.description`


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)

  const delegationStatus = await getDelegationStatus(user.delegationId)

  if (delegationStatus !== "delegate" && delegationStatus !== "completed") {
    return redirect(`/dashboard/${delegationStatus}`)
  }

  const delegation = await getDelegationById(user.delegationId)
  if (!delegation) throw new Error("asdasdasdasd")

  const isDelegatedStatus = await checkDelegationIsDelegated(delegation.id, delegation)
  const defaultCouncils: Item[] = [
    {
      council: "Conselho de Segurança das Nações Unidas",
      language: "portuguese",
      id: 1,
      description: "Responsabilidade primária pela manutenção da paz e segurança internacional. Tem poder para estabelecer missões de paz, impor sanções internacionais e autorizar ações militares quando necessário. É composto por 15 membros, sendo 5 permanentes com poder de veto."
    },
    {
      council: "Assembleia Geral das Nações Unidas",
      language: "english",
      id: 2,
      description: "Principal órgão deliberativo, de formulação de políticas e representativo da ONU. Reúne todos os 193 Estados-membros para discussões multilaterais sobre questões internacionais, incluindo paz, desenvolvimento, direitos humanos e direito internacional."
    },
    {
      council: "Conselho Econômico e Social das Nações Unidas",
      language: "portuguese",
      id: 3,
      description: "Coordena o trabalho econômico e social da ONU e das agências especializadas. Promove o desenvolvimento sustentável nas suas três dimensões: econômica, social e ambiental. Serve como fórum central para discussão de questões econômicas e sociais internacionais."
    },
    {
      council: "Conselho de Direitos Humanos das Nações Unidas",
      language: "spanish",
      id: 4,
      description: "Responsável por promover e proteger os direitos humanos em todo o mundo. Aborda situações de violações de direitos humanos, desenvolve o direito internacional nesta área e monitora o cumprimento das obrigações pelos Estados-membros através de um processo de revisão periódica universal."
    },
  ]

  const { payments: _payments, ...filteredDelegation } = delegation
  return json({ delegation: filteredDelegation, defaultCouncils })
}


export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request)
  const text = await request.text()

  let { data: _data, userId, ...rest } = qs.parse(text)
  let data = _data ? JSON.parse(_data as string) : undefined

  const result = preferenceSchema.safeParse(data);
  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const user = await setParticipantPreference(result.data, userId as string)
    console.dir(user, { depth: null })

    return json({
      success: true,
      userPreferences: user.councilPreference
    })
  } catch (error) {
    console.log(error)
    return json(
      { generalError: { "message": "Erro inesperado!", "description": "Por favor, recarregue a página e tente novamente" } },
      { status: 400 }
    )
  }
}


export default function Delegate() {
  const { delegation, defaultCouncils } = useLoaderData<typeof loader>()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<typeof delegation.users[0] | null>(null)

  return (
    <div className='space-y-12'>
      <div
        className={cn(
          "flex flex-col gap-8 items-start",
          "lg:max-w-[50%] md:max-w-[60%] sm:max-w-full p-6  bg-accent rounded-xl",
          "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
        )}
      >
        <div className='space-y-4'>
          <p>Nessa etapa, a delegação preenche as preferências de comitês e conferências dos seus delegados.</p>
          <p>Cada participante pode preencher sozinho, ou o chefe de delegação e advisors podem preencher para todo mundo!</p>
          <p>Se a sua delegação precisar editar os participantes, você pode fazer isso voltando para a página de
            <Button asChild variant="link" className="px-1 py-0 h-auto text-base">
              <Link to="/dashboard/participants">participantes</Link>
            </Button>
          </p>
        </div>
      </div>

      <div className='space-y-8'>
        <div>
          Delegados e Designações
        </div>

        <Table>
          <TableCaption>Lista de delegados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className=''>Preferência</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {delegation.users.map((user, index) => {
              const firstTime = user.councilPreference.length === 0

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium truncate">
                    {user.name}
                  </TableCell>

                  <TableCell className=' italic'>
                    {user.councilPreference.length > 0 ?
                      <div className='flex items-center gap-4 justify-start'>
                        <div className='truncate w-[200px]'>
                          {user.councilPreference[0].council}
                        </div>

                        <Popover>
                          <PopoverTrigger>
                            <Info className='size-5' />
                          </PopoverTrigger>

                          <PopoverContent className='w-[90vw] md:w-96'>
                            {user.councilPreference.map((c, idx) => (
                              <div key={idx}>{idx + 1}. {c.council}</div>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      "Não definida"
                    }
                  </TableCell>

                  <TableCell className='text-right'>
                    <Button size="sm" variant="link" className='p-0 h-auto'
                      onClick={() => {
                        setIsDialogOpen(true)
                        setSelectedUser(user)
                      }}
                    >
                      {firstTime ? "Adicionar" : "Alterar"} Preferência
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {selectedUser ?
          <SortableDialog
            key={`${selectedUser.id}-preference-dialog`}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            defaultCouncils={defaultCouncils}
            userId={selectedUser.id}
            userPreferences={selectedUser.councilPreference}
          />
          :
          null
        }
      </div>
    </div>
  )
}

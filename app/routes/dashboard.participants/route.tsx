import qs from 'qs'
import React from 'react'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, useActionData, Link } from '@remix-run/react'
import { z } from "zod"
import "~/lib/zod-error-map"
import { toast } from "sonner"
import { isValidPhoneNumber } from 'react-phone-number-input'

import { cn, mapValue, useUser } from '~/lib/utils'
import { requireUser, requireUserId } from '~/session.server'
import { checkDelegationParticipants, getDelegationStatus } from '~/models/delegation.server'
import { getOrCreateCustomer } from '~/stripe.server'
import { createUser } from './utils/create-user'

import { AlertCircle, AlertTriangle, Check, CheckIcon, EditIcon, FilePlus2, Info, UserPlus2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import EditForm from './edit-dialog'
import { updateUser, User } from '~/models/user.server'
import CreateDialog from './create-dialog'
import FilesDialog from './files-dialog'
import { getDelegationById } from './utils/get-delegation'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

const today = new Date();
today.setHours(0, 0, 0, 0)

export const formSchema = z.object({
  // Personal info
  email: z
    .string()
    .nonempty()
    .email(),
  name: z
    .string()
    .nonempty()
    .min(8),
  type: z
    .enum(["delegate", "advisor"], { message: "Selecione uma opcão" }),
  sex: z
    .enum(["masc", "fem", "other"]),
  socialName: z
    .string()
    .optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Telefone inválido" }),
  birthDate: z
    .coerce
    .date()
    .refine((d) => d < today, {
      message: "Data de nascimento deve ser anterior a hoje",
    }),
  nationality: z
    .string()
    .nonempty(),

  // Documents (conditionally required based on nationality)
  cpf: z.string().optional(),
  rg: z.string().optional(),
  passport: z.string().optional(),

  // Dietary info
  diet: z.enum(['vegan', 'vegetarian', 'other']).nullable().optional(),
  foodRestriction: z.string().optional(),

  // Advisor info
  advisorRole: z.enum(["teacher", "coordinator", "principal", "other"]).nullable().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),

  // Delegate info
  languagesSimulates: z.array(z.enum(["portuguese", "english", "spanish"])).default([]),
  educationLevel: z.enum(["university", "school", "prep_school"]).nullable().optional(),
  currentYear: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhoneNumber: z.string().optional(),
})
  .refine(
    (data) => {
      if (data.nationality === "BRA") {
        return data.rg;
      }
      return true
    },
    {
      message: "RG obrigatório",
      path: ["rg"],
    }
  )
  .refine(
    (data) => {
      if (data.nationality !== "BRA") {
        return data.passport;
      }
      return true
    },
    {
      message: "Passaporte obrigatório",
      path: ["passport"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.type === "advisor") {
      // Check if advisor role is provided when type is advisor
      if (!data.advisorRole) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "string",
          received: "undefined",
          path: ["advisorRole"],
          message: "Posição como Professor(a) Orientador(a) é obrigatória"
        });
      }

      // No validation needed for optional social media fields
    } else if (data.type === "delegate") {
      // Check all required delegate fields
      if (!data.languagesSimulates || data.languagesSimulates.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "array",
          received: "undefined",
          path: ["languagesSimulates"],
          message: "Selecione pelo menos um idioma"
        });
      }

      if (!data.educationLevel) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "string",
          received: "undefined",
          path: ["educationLevel"],
          message: "Nível de Escolaridade é obrigatório"
        });
      }

      if (!data.currentYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "string",
          received: "undefined",
          path: ["currentYear"],
          message: "Ano em que está cursando é obrigatório"
        });
      }

      if (!data.emergencyContactName) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "string",
          received: "undefined",
          path: ["emergencyContactName"],
          message: "Nome de contato de emergência é obrigatório"
        });
      }

      if (!data.emergencyContactPhoneNumber || !isValidPhoneNumber(data.emergencyContactPhoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "string",
          received: "undefined",
          path: ["emergencyContactPhoneNumber"],
          message: "Telefone de contato de emergência é obrigatório e deve ser válido"
        });
      }
    }
  });

export type ParticipantDataType = z.infer<typeof formSchema>

export type ParticipantFormKeys = "type" | "email" | "name" | "socialName" | "phoneNumber" | "birthDate" | "sex" | "nationality" | "rg" | "cpf" | "passport"


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)
  const delegation = await getDelegationById(user.delegationId)
  if (!delegation) throw new Error("asdasdasdasd")

  const delegationStatus = await getDelegationStatus(user.delegationId, delegation)
  if (delegationStatus === "payments") {
    return redirect("/dashboard/payments")
  }

  const delegationSubscriptionStatus = await checkDelegationParticipants(user.delegationId, delegation)
  if (!delegationSubscriptionStatus) throw new Error("asdasdasdasd")

  const { payments, paymentExpirationDate, ...filteredDelegation } = delegation

  return json({ delegationSubscriptionStatus, delegation: filteredDelegation })
}


export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request)
  const text = await request.text()

  let { data: _data, delegationId, updatingUserId, ...rest } = qs.parse(text)
  let data = _data ? JSON.parse(_data as string) : undefined

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    if (updatingUserId && typeof updatingUserId === "string" && updatingUserId.length > 10) {
      // TO-DO implement delegation participants left verification only if user changes type
      const user = await updateUser({ ...result.data }, updatingUserId)

      return json({
        success: true,
        type: "edit",
        updatedUser: user
      })
    } else {
      // TO-DO implement delegation participants left verification
      const stripeCustomerId = await getOrCreateCustomer(result.data.email)
      const user = await createUser(
        { ...result.data, stripeCustomerId },
        delegationId as string
      )

      return json({
        success: true,
        type: "create",
        createdUser: user
      })
    }
  } catch (error) {
    console.log(error)
    return json(
      { generalError: { "message": "Erro inesperado!", "description": "Por favor, recarregue a página e tente novamente" } },
      { status: 400 }
    )
  }
}


export default function Participants() {
  const { delegationSubscriptionStatus, delegation } = useLoaderData<typeof loader>()
  const user = useUser()
  const actionData = useActionData()
  useSonnerError(actionData)

  const [isEditParticipantDialogOpen, setIsEditParticipantDialogOpen] = React.useState(false)
  const [isCreateParticipantDialogOpen, setIsCreateParticipantDialogOpen] = React.useState(false)
  const [isFilesDialogOpen, setIsFilesDialogOpen] = React.useState(false)
  const [editSelectedUser, setEditSelectedUser] = React.useState<User | null>(null)

  return (
    <div className='space-y-12'>
      <p className='text-sm italic text-muted-foreground'>
        Observações:<br />
        1. Preenchimento dos dados pessoais dos integrantes da delegação <br />
        Após a confirmação do pagamento da inscrição, a delegação terá até a data limite de 02 de junho de 2025 para preencher os dados pessoais de todos(as) os(as) delegados(as) e Professores(as) Orientadores(as) que comporão a delegação no sistema de inscrições.<br />
        ATENÇÃO: Caso os dados pessoais de todos(as) os(as) integrantes não estejam preenchidos, as vagas não preenchidas serão canceladas e transferidas para a lista de espera. As vagas canceladas não terão reembolso.<br />
        2. Alterações ou substituições<br />
        As delegações poderão realizar a alteração de dados ou a substituição de participantes já inscritos (delegados(as) e Professores Orientadores) até a data limite de 08 de agosto de 2025 no sistema de inscrições.  Após essa data, não serão aceitas nenhuma alteração ou substituição. Integrantes que desistirem de participar não terão reembolso.
      </p>

      <div className='flex flex-col gap-8 items-start'>
        <div
          className={cn(
            "flex flex-col gap-8 items-start",
            "lg:max-w-[50%] md:max-w-[60%] sm:max-w-full p-6 bg-accent rounded-xl",
            "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
          )}
        >
          {delegationSubscriptionStatus.status === "pending" &&
            <div className='space-y-4'>
              <p>Para cadastrar participantes clique no botão para abaixo e siga as instruções</p>
              <p>Também é necessário anexar os arquivos pendentes de cada participante</p>
            </div>
          }

          {delegationSubscriptionStatus.status === "completed" &&
            <p>
              Todos os cadastros foram realizados com sucesso, para continuar com a sua inscrição siga para a página de
              <Button asChild variant="link" className="px-1 py-0 h-auto text-base">
                <Link to="/dashboard/delegate">designação</Link>
              </Button>
            </p>
          }

          {delegationSubscriptionStatus.status === "expired" && delegationSubscriptionStatus.totalNumberSubscriptions === 0 &&
            <div className='space-y-4'>
              <p>O tempo para cadastrar a sua equipe expirou!</p>
              <p>Se ainda tiver interesse em participar, entre em contato com a nosso suporte através do e-mail: famun@facamp.com.br</p>
            </div>
          }

          {delegationSubscriptionStatus.status === "expired" && delegationSubscriptionStatus.totalNumberSubscriptions > 0 &&
            <div className='space-y-4'>
              <p>O tempo para cadastrar o resto da sua equipe expirou!</p>
              <p>Somente os participantes cadastrados poderão participar, para continuar siga para a página de
                <Button asChild variant="link" className="px-1 py-0 h-auto text-base">
                  <Link to="/dashboard/delegate">designação</Link>
                </Button>
              </p>
              <p> Se ainda tiver interesse em cadastrar o restante para que eles possam participar, entre em contato com a nosso suporte através do e-mail: famun@facamp.com.br</p>
            </div>
          }
        </div>

        <span className='flex gap-3 items-center px-2'>
          {delegationSubscriptionStatus.delegates.remaining > 0 ?
            <>
              <AlertCircle className="size-5 text-warning" />
              Ainda faltam {delegationSubscriptionStatus.delegates.completed} cadastros de delegados
            </> :
            <>
              <Check className="size-5 text-positive" />
              Todas os cadastros ({user.delegation.maxDelegates}) de delegados foram realizados
            </>
          }
        </span>

        <span className='flex gap-3 items-center px-2'>
          {delegationSubscriptionStatus.advisors.remaining > 0 ?
            <>
              <AlertCircle className="size-5 text-warning" />
              Ainda faltam {delegationSubscriptionStatus.advisors.remaining} cadastros de advisors
            </> :
            <>
              <Check className="size-5 text-positive" />
              Todas os cadastros ({user.delegation.maxAdvisors}) de advisors foram realizados

            </>
          }
        </span>

        <div className='flex flex-col gap-4 items-stretch'>
          {
            delegationSubscriptionStatus.status === "pending" ?
              <Button size="xl" className='w-full' onClick={() => setIsCreateParticipantDialogOpen(true)}>
                <UserPlus2 /> Cadastrar participantes
              </Button>
              :
              null
          }
          {
            delegationSubscriptionStatus.status === "pending" ?
              <Button size="xl" variant="outline" className='w-full' onClick={() => setIsFilesDialogOpen(true)}>
                <FilePlus2 /> Anexar Documentos e Arquivos
              </Button>
              :
              null
          }
          <CreateDialog
            delegationId={delegation.id}
            delegationSubscriptionStatus={delegationSubscriptionStatus}
            isDialogOpen={isCreateParticipantDialogOpen}
            setIsDialogOpen={setIsCreateParticipantDialogOpen}
          />

          <FilesDialog
            delegation={delegation}
            isDialogOpen={isFilesDialogOpen}
            setIsDialogOpen={setIsFilesDialogOpen}
          />

          <Alert>
            <AlertTriangle className="size-5" />
            <AlertTitle>Aviso!</AlertTitle>
            <AlertDescription>
              As informações devem ser preenchidas até {new Date(new Date().getFullYear(), 7, 8).toLocaleDateString("pt-BR")}
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {delegation.users.length > 0 ?
        <div className='space-y-8'>
          <div>
            Participantes Cadastrados
          </div>

          <Table>
            <TableCaption>Lista de participantes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">E-mail</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead className="text-right">Entrou em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {delegation.users.map((participant, index) => {
                let requiredFiles = participant.type === "delegate" ? 2 : 1
                let userFilesCount = requiredFiles

                if (participant.files && Array.isArray(participant.files)) {
                  for (const file of participant.files) {
                    if (file.type === "Position Paper") {
                      userFilesCount -= 1
                    } else if (file.type === "Liability Waiver") {
                      userFilesCount -= 1
                    }
                  }
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium truncate">
                      <div className='flex items-center gap-3'>
                        {user.id === participant.id ? <div className="h-1.5 w-1.5 rounded-full bg-primary" /> : null}
                        {participant.name}
                      </div>
                    </TableCell>

                    <TableCell>{participant.email}</TableCell>

                    <TableCell>{mapValue(participant.type)} </TableCell>

                    <TableCell>
                      <div className='flex items-center gap-3'>
                        {userFilesCount === 0 ?
                          <>
                            <CheckIcon className='size-5 text-positive' />
                            Enviados!
                          </>
                          :
                          <>
                            <Popover>
                              <PopoverTrigger>
                                <Info className='size-5 text-warning' />
                              </PopoverTrigger>

                              <PopoverContent className='w-[90vw] md:w-72'>
                                Arquivos enviados: <br />
                                {participant.files.map((file, idx) => (
                                  <div key={idx} className='flex items-center gap-3'>
                                    <CheckIcon className="size-5 text-positive" /> {file.type}
                                    <p className='text-muted-foreground'>
                                      ({new Date(file.createdAt).toLocaleDateString()})
                                    </p>
                                  </div>
                                ))}
                              </PopoverContent>
                            </Popover>
                            {requiredFiles - userFilesCount}/{requiredFiles} Enviados
                          </>
                        }
                      </div>
                    </TableCell>

                    <TableCell className="text-right">{new Date(participant.createdAt).toLocaleDateString("pt-BR")}</TableCell>

                    <TableCell>
                      <div className='flex items-center gap-4 justify-end p-0'>
                        <span
                          //size="icon"
                          //variant="ghost"
                          onClick={() => {
                            setIsEditParticipantDialogOpen(true)
                            setEditSelectedUser(participant as any)
                          }}
                          className='cursor-pointer'
                        >
                          <EditIcon className='size-4' />
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {editSelectedUser ?
            <EditForm
              key={`${editSelectedUser.id}-edit-dialog`}
              delegationId={delegation.id}
              delegationSubscriptionStatus={delegationSubscriptionStatus}
              isDialogOpen={isEditParticipantDialogOpen}
              setIsDialogOpen={setIsEditParticipantDialogOpen}
              user={editSelectedUser}
            />
            :
            null
          }
        </div>
        :
        null
      }

    </div >
  )
}


function useSonnerError(actionData: any) {
  React.useEffect(() => {
    if (actionData?.generalError) {
      toast(actionData.generalError.message, {
        description: actionData.generalError.description,
        icon: <AlertTriangle className="h-4 w-4" />
      })
    }
  }, [actionData])
}
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'

import { requireUser } from '~/session.server'
import { getDelegationById, getDelegationStatus } from '~/models/delegation.server'

import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { FlagComponent } from '~/components/ui/flag-component'
import { InfoIcon } from 'lucide-react'


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)

  const delegationStatus = await getDelegationStatus(user.delegationId)

  if (delegationStatus !== "delegate" && delegationStatus !== "completed") {
    return redirect(`/dashboard/${delegationStatus}`)
  }

  const delegation = await getDelegationById(user.delegationId)

  if (!delegation) throw new Error("asdasdasdasd")

  return json({ delegation })
}



export default function Delegate() {
  const { delegation } = useLoaderData<typeof loader>()

  return (
    <div className='space-y-12'>
      <div className='flex flex-col gap-8 items-start lg:max-w-[50%] md:max-w-[60%] sm:max-w-full'>
        <div>
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
              <TableHead></TableHead>
              <TableHead className='w-[400px]'>Comitê/Conselho</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {delegation.users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium truncate">
                    {user.name}
                  </TableCell>

                  <TableCell>
                    <div className='flex items-center gap-4'>
                      <FlagComponent country={"BR"} countryName={"Brazil"} />
                      Brazil
                    </div>
                  </TableCell>

                  <TableCell >
                    <div className='flex items-center gap-4 justify-end'>
                      <Popover>
                        <PopoverTrigger>
                          <InfoIcon className='size-5' />
                        </PopoverTrigger>

                        <PopoverContent className='w-96' align='center'>
                          <div className='space-y-4'>
                            Comite de Segurança das Nações Unidas Comite de Segurança das Nações Unida Comite de Segurança das Nações Unidas Comite de Segurança das Nações Unidas
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className='w-[400px] truncate'>
                        Comite de Segurança das Nações Unidas Comite de Segurança das Nações Unida Comite de Segurança das Nações Unidas Comite de Segurança das Nações Unidas
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Link, useLoaderData } from '@remix-run/react';
import { getDelegationById } from './utils/get-delegation';
import { mapValue } from '~/lib/utils';
import { CheckIcon, EditIcon, ExternalLink, InfoIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log(params)
  const delegation = await getDelegationById(params.delegationId as string)

  if (!delegation) {
    return redirect('/admin')
  }

  return json({ delegation })
}


export default function AdminDelegationPage() {
  const { delegation } = useLoaderData<typeof loader>()

  return (
    <div className='w-full space-y-12'>
      <div>
        <Button variant="link" asChild name="action" className='text-foreground px-0'>
          <Link to="/admin">
            Voltar
          </Link>
        </Button>

        <h2 className='text-lg'>
          {delegation.school}
        </h2>
      </div>


      <div className='space-y-4'>
        <h3>
          Participantes
        </h3>

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
                              <InfoIcon className='size-5 text-warning' />
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
                        /* onClick={() => {
                          setIsEditParticipantDialogOpen(true)
                          setEditSelectedUser(participant as any)
                        }} */
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
      </div>

      <div className='space-y-4'>
        <h3>
          Participantes
        </h3>

        <Table>
          <TableCaption>Lista de pagamentos realizados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pagamento</TableHead>
              <TableHead>Realizado por</TableHead>
              <TableHead className="w-[100px]">Valor</TableHead>
              <TableHead>Recibo</TableHead>
              <TableHead>Método de Pagamento</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delegation.payments.map((payment, index) => {
              const paymentsCount = payment.delegatesPayments + payment.advisorsPayments

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className='flex items-center gap-4 truncate'>
                      Inscrição de {paymentsCount ? ` ${paymentsCount}x participante${paymentsCount as number > 1 ? "s" : ""}` : ''}

                      <Popover>
                        <PopoverTrigger>
                          <InfoIcon className='size-5' />
                        </PopoverTrigger>

                        <PopoverContent className='w-[90vw] md:w-72'>
                          {payment.delegatesPayments > 0 ? <>{payment.delegatesPayments} Pagamentos de Delegado{payment.delegatesPayments > 1 ? "s" : ""}<br /></> : <></>}
                          {payment.advisorsPayments > 0 ? <>{payment.advisorsPayments} Pagamentos de Advisor{payment.advisorsPayments > 1 ? "s" : ""}</> : <></>}
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>

                  <TableCell>{delegation.users.find((u) => u.id === payment.userId)?.name || ""} </TableCell>

                  <TableCell>{(payment.amount / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} </TableCell>

                  <TableCell>
                    <Button asChild variant="link" className='p-0'>
                      <a className='h-auto px-0 py-0' href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className='size-4' />
                        Recibo
                      </a>
                    </Button>
                  </TableCell>

                  <TableCell>{mapValue(payment.paymentMethod)}</TableCell>

                  <TableCell className="text-right">{new Date(payment.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

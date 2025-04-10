import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireAdmin } from '~/session.server'
import { getDelegations } from './utils/get-delegations'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { useLoaderData, useNavigate } from '@remix-run/react'


export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAdmin(request)

  const delegations = await getDelegations()

  return json({ delegations })
}


export default function AdminIndex() {
  const { delegations } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  return (
    <div className='w-full flex flex-col gap-8 sm:gap-14'>
      <div className='text-lg flex justify-between sm:justify-start gap-2 items-center'>
        Delegações
      </div>

      <Table>
        <TableCaption>Lista de delegações.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Escola/Universidade</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead>Pagamentos</TableHead>
            <TableHead>Participantes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {delegations.map((delegation, index) => (
            <TableRow
              key={index}
              onClick={() => navigate(`/admin/${delegation.id}`)}
              tabIndex={0}
              role="link"
              aria-label={`Details for delegation ${delegation.school}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Space') {
                  event.preventDefault();
                  navigate(`/admin/${delegation.id}`)
                }
              }}
              className='cursor-pointer'
            >
              <TableCell className="font-medium truncate">
                {delegation.school}
              </TableCell>

              <TableCell>
                {new Date(delegation.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {delegation.payments.length === (delegation.maxAdvisors + delegation.maxDelegates) ? "Realizados" : "Pendentes"}
              </TableCell>

              <TableCell>
                {delegation._count.users}
              </TableCell>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </div>
  )
}

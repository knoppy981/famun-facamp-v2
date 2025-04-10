import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useLoaderData, useMatches } from '@remix-run/react';

import { getUserId } from '~/session.server';
import { decodeJwt } from '~/lib/jwt';
import { cn } from '~/lib/utils';
import { checkDelegationParticipants } from '~/models/delegation.server';
import { getDelegationByCode } from './utils/get-delegation';

import Navbar from '~/components/navbar';
import { Button } from '~/components/ui/button';


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)

  if (userId) return redirect('/dashboard')

  const { token } = params
  invariant(token, "token is required")
  const decoded: any = await decodeJwt(token)

  if (decoded.err) throw json({ message: "Link inválido", name: "Erro no Link" }, { status: 404 });

  const { delegationCode } = decoded?.payload
  const delegation = await getDelegationByCode(delegationCode)

  if (!delegation) throw new Error("asdasdasdasd")

  const delegationSubscriptionStatus = await checkDelegationParticipants(delegation.id, delegation)
  if (!delegationSubscriptionStatus) throw new Error("asdasdasdasd")


  return json({ delegation, delegationSubscriptionStatus })
}


export default function InviteLandingPage() {
  const { delegation, delegationSubscriptionStatus } = useLoaderData<typeof loader>()
  const matches = useMatches()

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div
        className={cn(
          "p-8 min-w-full sm:min-w-[28rem] sm:rounded-xl",
          "sm:shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
        )}
      >
        <div className='space-y-10'>
          <h1 className="text-3xl">
            Bem-vindo!
          </h1>

          <div>
            Você foi convidado(a) para participar da delegação do(a)
            <br />{delegation?.school}
          </div>

          <div>
            Para entrar, clique no botão abaixo e crie seu cadastro!
          </div>

          <Button asChild className='w-full'>
            <Link
              to={{
                pathname: `/join`,
                search: `${new URLSearchParams([["token", matches[1].params.token as string]])}`
              }}
            >
              Entrar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
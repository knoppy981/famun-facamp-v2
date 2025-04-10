import React from 'react'
import qs from 'qs'
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation, useSearchParams } from '@remix-run/react';

import { createUserSession, getSession, getUserId, sessionStorage } from '~/session.server';
import { getSessionData } from './utils/get-session-data';
import { createUserAndJoin } from './utils/create-user-and-join';
import { cn, safeRedirect } from '~/lib/utils';
import { getExistingUser } from '~/models/user.server';
import { getDelegationByCode, getExistingDelegation } from '~/models/delegation.server';
import { createUserAndDelegation } from './utils/create-user-and-delegation';
import { toast } from "sonner"
import { getOrCreateCustomer } from '~/stripe.server';
import { checkJwtToken } from './utils/check-jwt-token';
import { checkDelegationAvailability } from './utils/check-delegation-availability';

import { AlertTriangle } from 'lucide-react';
import Navbar from '~/components/navbar';
import { Button } from '~/components/ui/button';
import TermsAndConditionsStep from './steps/terms-and-conditions';
import AccountStep, { AccountStepType, formSchema as accountFormSchema } from './steps/account';
import JoinTypeStep from './steps/join-type';
import JoinDelegationStep from './steps/join-delegation';
import CreateDelegationStep, { CreateDelegationStepType, formSchema as createDelegationFormSchema } from './steps/create-delegation';
import ConfirmStep from './steps/confirm';
import DataStep, { DataStepType, formSchema as dataFormSchema } from './steps/data';
import DelegateStep, { DelegateStepType, formSchema as delegateFormSchema } from './steps/delegate';
import AdvisorStep, { AdvisorStepType, formSchema as advisorFormSchema } from './steps/advisor';
import Tutorial from './tutorial';


const LAST_STEP = 7 as const


export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request)
  const text = await request.text()

  let { redirectTo, step, action, joinType, token, data: _data, ...rest } = qs.parse(text)
  const data = _data ? JSON.parse(_data as string) : undefined

  const searchParams = new URLSearchParams()
  if (redirectTo) searchParams.append('redirectTo', redirectTo as string)
  if (token) searchParams.append('token', token as string)

  if (joinType) {
    session.set(`join-type`, { joinType: joinType })
  } else {
    joinType = session.get("join-type")?.joinType || undefined
  }

  if (action === 'next') {
    if (Number(step) === 2) {
      // check account data
      const result = accountFormSchema.safeParse(data);
      if (!result.success) {
        return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
      }

      // check for already existing user data
      if (!data || await getExistingUser({ email: data.email })) {
        return json(
          { errors: { "email": "Já existe um usuário com este e-mail" } },
          { status: 400 }
        );
      }
    }

    if (Number(step) === 3) {
      // check user data
      const result = dataFormSchema.safeParse(data);

      if (!result.success) {
        return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
      }

      session.set(`participant-type`, { participantType: result.data.type })
    }

    if (Number(step) === 4) {
      const participantType = session.get("participant-type")?.participantType || undefined

      if (participantType === "delegate") {
        const result = delegateFormSchema.safeParse(data);
        if (!result.success) {
          return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
        }
      } else {
        const result = advisorFormSchema.safeParse(data);
        if (!result.success) {
          return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
        }
      }

      if (token && typeof token === "string" && token.length > 10) {
        const delegation = await checkJwtToken(token)

        if (delegation) {
          const nextStep = LAST_STEP
          session.set('step', { step: nextStep })
          session.set(`user-data-${step}`, data)
          session.set(`user-data-6`, { code: delegation.code, school: delegation.school, participationMethod: delegation.participationMethod })
          session.set('join-type', { joinType: "join" })

          return redirect(`/join?${searchParams}`, {
            headers: {
              'Set-cookie': await sessionStorage.commitSession(session),
            },
          })
        }
      }
    }

    if (Number(step) === 6) {
      if (joinType === "create") {
        // check delegation data
        const result = createDelegationFormSchema.safeParse(data);
        if (!result.success) {
          return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
        }

        // check for already existing delegation data
        if (!data || await getExistingDelegation({ school: data.school })) {
          return json(
            { errors: { "school": "Já existe uma delegação com este nome" } },
            { status: 400 }
          );
        }
      } else if (joinType === "join") {
        // check existing delegation
        const delegation = await getDelegationByCode(data.code)

        if (!delegation) {
          return json(
            { errors: { "code": "Delegação não encontrada" } },
            { status: 400 }
          )
        }

        data.school = delegation.school
        data.participationMethod = delegation.participationMethod
      }
    }

    if (Number(step) === LAST_STEP) {
      const participantType: "delegate" | "advisor" = session.get("participant-type")?.participantType || undefined

      if (joinType === "create") {
        // create user & create delegation
        const accountData = session.get(`user-data-2`) as AccountStepType
        const data = session.get(`user-data-3`) as DataStepType
        const participantData = participantType === "delegate" ? session.get(`user-data-4`) as DelegateStepType : session.get(`user-data-4`) as AdvisorStepType
        const delegationData = session.get(`user-data-6`) as CreateDelegationStepType

        try {
          const stripeCustomerId = await getOrCreateCustomer(accountData.email)
          const delegation = await createUserAndDelegation(
            delegationData,
            { ...accountData, ...data, ...participantData, stripeCustomerId }
          )

          const user = delegation.users[0]

          return createUserSession({
            request,
            userId: user.id,
            remember: false,
            redirectTo: redirectTo ? safeRedirect(redirectTo as string) : "/dashboard",
          });
        } catch (error) {
          console.log(error)
          return json(
            { generalError: { "message": "Erro inesperado!", "description": "Por favor, recarregue a página e tente novamente" } },
            { status: 400 }
          )
        }
      } else if (joinType === "join") {
        // create user & join delegation
        const accountData = session.get(`user-data-2`) as AccountStepType
        const data = session.get(`user-data-3`) as DataStepType
        const participantData = participantType === "delegate" ? session.get(`user-data-4`) as DelegateStepType : session.get(`user-data-4`) as AdvisorStepType

        try {
          const code = session.get(`user-data-6`)?.code
          if (!code) throw new Error()

          const delegationSubscriptionStatus = await checkDelegationAvailability(code, participantType)

          if (!delegationSubscriptionStatus) {
            return json(
              { generalError: { "message": "Delegacão Lotada!", "description": "Fale com a nossa equipe para saber mais sobre as vagas disponíveis" } },
              { status: 400 }
            )
          }

          const stripeCustomerId = await getOrCreateCustomer(accountData.email)
          const user = await createUserAndJoin({ ...accountData, ...data, ...participantData, stripeCustomerId }, code)

          return createUserSession({
            request,
            userId: user.id,
            remember: false,
            redirectTo: redirectTo ? safeRedirect(redirectTo as string) : "/dashboard",
          });
        } catch (error) {
          console.log(error)
          return json(
            { generalError: { "message": "Erro inesperado!", "description": "Por favor, recarregue a página e tente novamente" } },
            { status: 400 }
          )
        }
      }
    }
  } else {
    if (Number(step) === LAST_STEP && token && typeof token === "string" && token.length > 0) {
      session.set('step', { step: 4 })

      return redirect(`/join?${searchParams}`, {
        headers: {
          'Set-cookie': await sessionStorage.commitSession(session),
        },
      })
    }
  }

  const nextStep = Number(step) + (action === 'next' ? 1 : -1)
  session.set('step', { step: nextStep })
  if (action === 'next') session.set(`user-data-${step}`, data)

  return redirect(`/join?${searchParams}`, {
    headers: {
      'Set-cookie': await sessionStorage.commitSession(session),
    },
  })
}


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (userId) return redirect("/")
  const session = await getSession(request)
  const sessionData = await getSessionData(LAST_STEP, session)

  return json(sessionData)
}


export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  let { step, data, joinType, participantType } = useLoaderData<typeof loader>()
  const actionData = useActionData<any>()

  if (!step) step = 1
  const redirectTo = searchParams.get("redirectTo") || "";
  const delegationToken = searchParams.get("token") || "";
  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/join") || false

  useSonnerError(actionData)
  const formHiddenInputs: { [key: string]: number | string; } = {
    redirectTo: redirectTo || "",
    token: delegationToken || ""
  }


  return (
    <div className="h-svh sm:h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div className='max-h-[65svh] sm:max-h-[30rem]'>
        <div className='pb-32'>
          <div
            className={cn(
              "p-8 w-screen sm:w-[38rem] sm:rounded-xl",
              "sm:shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
            )}
          >
            {step > 2 &&
              <Form method='PUT'>
                {/* values necessary for the multi step form */}
                <input type="hidden" name="step" value={step} />
                {Object.entries(formHiddenInputs).map(([key, value], index) => (
                  <input key={index} type="hidden" name={key} value={value} />
                ))}

                <Button variant="link" disabled={isLoading} name="action" value="previous" className='text-foreground px-0'>
                  Voltar
                </Button>
              </Form>
            }

            {step === 1 && <TermsAndConditionsStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} step={step} />}
            {step === 2 && <AccountStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} />}
            {step === 3 && <DataStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} />}
            {step === 4 ?
              participantType === "delegate" ?
                <DelegateStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} /> :
                <AdvisorStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} />
              : null
            }
            {step === 5 && <JoinTypeStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} step={step} />}
            {step === 6 ?
              joinType === "create" ?
                <CreateDelegationStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} /> :
                <JoinDelegationStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} actionData={actionData} step={step} />
              : null
            }
            {step === LAST_STEP && <ConfirmStep isLoading={isLoading} formHiddenInputs={formHiddenInputs} data={data} joinType={joinType} step={step} participantType={participantType} />}
          </div>
        </div>
      </div>

      <Tutorial step={step} />
    </div>
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



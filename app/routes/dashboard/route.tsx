import React from 'react'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn, useUser } from '~/lib/utils'
import { requireUser } from '~/session.server'
import { getDelegationStatus } from '~/models/delegation.server'
import { useMediaQuery } from '~/hooks/useMediaQuery'

import Navbar from '~/components/navbar'
import { Progress } from '~/components/ui/progress'
import { Check, Lock, Mail } from 'lucide-react'
import InviteDialog from './invite-dialog'
import { Button } from '~/components/ui/button'


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)
  const url = new URL(request.url)

  const delegationStatus = await getDelegationStatus(user.delegationId)

  if (!delegationStatus) throw new Error("asdsdadadsasdasd")

  if (url.pathname === "/dashboard") return redirect(`/dashboard/${delegationStatus}`)

  return json({ delegationStatus })
}


export default function Dashboard() {
  const { delegationStatus } = useLoaderData<typeof loader>()
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false)
  const user = useUser()
  const location = useLocation();
  const mainProgress = location.pathname.slice(11)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className="h-svh sm:h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div className='max-h-[65svh] sm:max-h-[40rem] w-[90%] sm:w-[80%]'>
        <div className='pb-32'>
          <div className='w-full flex flex-col gap-8 sm:gap-14'>
            <div className='text-lg flex justify-between sm:justify-start gap-2 items-center'>
              {user.delegation.school}

              <Button onClick={() => setIsInviteDialogOpen(true)} variant="ghost">
                <Mail />
                <span className="sr-only">Invite</span>
              </Button>

              <InviteDialog
                inviteLink={user.delegation.inviteLink}
                delegationCode={user.delegation.code}
                isDialogOpen={isInviteDialogOpen}
                setIsDialogOpen={setIsInviteDialogOpen}
              />
            </div>

            <div className='shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)] rounded-full p-1'>
              <Progress className='h-10 bg-transparent' isDesktop={isDesktop} mainProgress={mainProgress} backgroundProgress={delegationStatus}>
                <div className='absolute top-0 z-20 w-full h-full flex px-3'>
                  <NavLink
                    to="payments"
                    className={({ isActive, isPending }) => cn(
                      'flex items-center justify-center gap-4 flex-1',
                      isActive ? "underline" : "max-sm:flex-shrink-1 max-sm:flex-grow-0 max-sm:basis-16"
                    )}
                  >
                    {/* {({ isActive }) => (isActive ? '1. Pagamentos': <><Check className='size-4'/> 1.</>)} */}
                    {({ isActive }) => {
                      if (isDesktop) {
                        return (
                          <><Check className="size-5 text-foreground" /> 1. Pagamentos</>
                        )
                      }

                      return (
                        <motion.div
                          key={`${isActive}`}
                          layout
                        >
                          <AnimatePresence>
                            {isActive ? (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  duration: 0.95,
                                }}
                                className='flex gap-2 items-center underline'
                              >
                                <Check className="size-5 text-foreground" /> 1. Pagamentos
                              </motion.span>
                            ) : (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  duration: 0.95,
                                }}
                                className='flex gap-2 items-center'
                              >
                                <Check className="size-5 text-foreground" /> 1.
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    }}
                  </NavLink>

                  {delegationStatus !== "payments" ?
                    <NavLink
                      to="participants"
                      className={({ isActive, isPending }) => cn(
                        'flex items-center justify-center gap-4 flex-1',
                        isActive ? "underline" : "max-sm:flex-shrink-1 max-sm:flex-grow-0 max-sm:basis-16"
                      )}
                    >
                      {/* {({ isActive }) => (<>2. {isActive && 'Participantes'}</>)} */}
                      {({ isActive }) => {
                        if (isDesktop) {
                          return (
                            <><Check className="size-5 text-foreground" /> 2. Participantes</>
                          )
                        }

                        return (
                          <motion.div
                            key={`${isActive}`}
                            layout
                          >
                            <AnimatePresence>
                              {isActive ? (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, filter: "blur(0px)" }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.95,
                                  }}
                                  className='flex gap-2 items-center underline'
                                >
                                  <Check className="size-5 text-foreground" /> 2. Participantes
                                </motion.span>
                              ) : (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, filter: "blur(0px)" }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.95,
                                  }}
                                  className='flex gap-2 items-center'
                                >
                                  <Check className="size-5 text-foreground" /> 2.
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      }}
                    </NavLink>
                    :
                    <div className="flex items-center justify-center gap-2 opacity-50 flex-1 max-sm:flex-shrink-1 max-sm:flex-grow-0 max-sm:basis-16">
                      <Lock className='size-4' /> 2. {isDesktop ? "Participantes" : null}
                    </div>
                  }

                  {delegationStatus === "delegate" || delegationStatus === "completed" ?
                    <NavLink
                      to="delegate"
                      className={({ isActive, isPending }) => cn(
                        'flex items-center justify-center gap-4 flex-1',
                        isActive ? "underline" : "max-sm:flex-shrink-1 max-sm:flex-grow-0 max-sm:basis-16"
                      )}
                    >
                      {/* {({ isActive }) => (<>3. {isActive && 'Designação'}</>)} */}
                      {({ isActive }) => {
                        if (isDesktop) {
                          return (
                            <><Check className="size-5 text-foreground" /> 3. Designação</>
                          )
                        }

                        return (
                          <motion.div
                            key={`${isActive}`}
                            layout
                          >
                            <AnimatePresence>
                              {isActive ? (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, filter: "blur(0px)" }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.95,
                                  }}
                                  className='flex gap-2 items-center underline'
                                >
                                  <Check className="size-5 text-foreground" /> 3. Designação
                                </motion.span>
                              ) : (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, filter: "blur(0px)" }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.95,
                                  }}
                                  className='flex gap-2 items-center'
                                >
                                  <Check className="size-5 text-foreground" /> 3.
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      }}
                    </NavLink>
                    :
                    <div className="flex items-center justify-center gap-2 opacity-50 flex-1 max-sm:flex-shrink-1 max-sm:flex-grow-0 max-sm:basis-16">
                      <Lock className='size-4' /> 3. {isDesktop ? "Designação" : null}
                    </div>
                  }
                </div>
              </Progress>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
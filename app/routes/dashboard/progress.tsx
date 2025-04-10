import { NavLink } from '@remix-run/react'

import { cn } from '~/lib/utils'

import { Progress } from '~/components/ui/progress'
import { Check, Lock } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'


interface NavProgress {
  isDesktop: boolean
  mainProgress: string | number
  delegationStatus: string | number
}


export default function NavProgress({ isDesktop, mainProgress, delegationStatus }: NavProgress) {

  return (
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
  )
}

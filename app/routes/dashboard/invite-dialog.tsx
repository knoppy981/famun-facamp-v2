import React from 'react'
import { useMediaQuery } from '~/hooks/useMediaQuery'

import { Event } from "~/lib/events"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import { Button, ButtonProps } from "~/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { AnimatePresence, motion } from 'motion/react'


interface InviteDialog {
  inviteLink: string
  delegationCode: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function InviteDialog({ inviteLink, delegationCode, isDialogOpen, setIsDialogOpen }: InviteDialog) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Convidar Participantes</DrawerTitle>
            <DrawerDescription>
              Compartilhe o link abaixo ou envie o código para os participantes inserirem no cadastro
            </DrawerDescription>
          </DrawerHeader>

          <div className='mb-8 space-y-8 min-w-0'>
            <div className='flex justify-between items-end min-w-0 gap-4'>
              <div className='flex flex-col min-w-0'>
                <p className='text-muted-foreground text-sm'>Link</p>
                <p className='truncate'>
                  {inviteLink}
                </p>
              </div>

              <CopyButton value={inviteLink} className='flex-grow-0 flex-shrink-0 basis-auto' />
            </div>

            <div className='flex justify-between items-end min-w-0 gap-4'>
              <div className='flex flex-col min-w-0'>
                <p className='text-muted-foreground text-sm'>Código</p>
                <p className='truncate'>
                  {delegationCode}
                </p>
              </div>

              <CopyButton value={delegationCode} className='flex-grow-0 flex-shrink-0 basis-auto' />
            </div>
          </div>
        </DrawerContent>
      </Drawer >
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='max-w-96'>
        <DialogHeader>
          <DialogTitle>Convidar Participantes</DialogTitle>
          <DialogDescription>
            Compartilhe o link abaixo ou envie o código para os participantes inserirem no cadastro
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 min-w-0'>
          <div className='flex justify-between items-end min-w-0 gap-4'>
            <div className='flex flex-col min-w-0'>
              <p className='text-muted-foreground text-sm'>Link</p>
              <p className='truncate'>
                {inviteLink}
              </p>
            </div>

            <CopyButton value={inviteLink} className='flex-grow-0 flex-shrink-0 basis-auto' />
          </div>

          <div className='flex justify-between items-end min-w-0 gap-4'>
            <div className='flex flex-col min-w-0'>
              <p className='text-muted-foreground text-sm'>Código</p>
              <p className='truncate'>
                {delegationCode}
              </p>
            </div>

            <CopyButton value={delegationCode} className='flex-grow-0 flex-shrink-0 basis-auto' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


interface CopyButtonProps extends ButtonProps {
  value: string
  src?: string
  event?: Event["name"]
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
  /* if (event) {
    trackEvent(event)
  } */
}

export function CopyButton({
  value,
  src,
  variant = "link",
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
              name: event,
              properties: {
                code: value,
              },
            }
            : undefined
        )
        setHasCopied(true)
      }}
      {...props}
    >
      <motion.div
        key={`${hasCopied}`}
        layout
      >
        <span className="sr-only">Copy</span>
        {/* hasCopied ? <CheckIcon /> : <ClipboardIcon /> */}
        <AnimatePresence>
          {hasCopied ? (
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                duration: 0.95,
              }}
            >
              <CheckIcon className="size-4 text-foreground" />
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                duration: 0.95,
              }}
            >
              <ClipboardIcon className="size-4 text-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Button>
  )
}
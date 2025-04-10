import React from 'react'
import { Form as RemixForm, useSubmit, useActionData, useNavigation } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import "~/lib/zod-error-map"
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'

import { cn, mapValue } from '~/lib/utils'
import { preferenceSchema, PreferenceSchema, PreferenceSchemaKeys } from './route'
import { toast } from 'sonner'
import { useMediaQuery } from '~/hooks/useMediaQuery'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { CheckIcon, InfoIcon, Loader2, XIcon } from 'lucide-react'
import { Item, SortableList, SortableListItem } from "./sortable"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer"
import { ScrollArea } from '~/components/ui/scroll-area'

interface SortableDialg {
  defaultCouncils: Item[]
  userPreferences: Item[]
  userId: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function SortableDialog({ defaultCouncils, userId, userPreferences, isDialogOpen, setIsDialogOpen }: SortableDialg) {
  const actionData = useActionData()
  const navigation = useNavigation();
  const { items, setItems, form, onSubmit } =
    usePreferenceForm({ actionData, userPreferences, defaultCouncils, userId, isDialogOpen, setIsDialogOpen })

  const [openItemId, setOpenItemId] = React.useState<number | null>(null)
  const firstTime = userPreferences.length === 0
  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/dashboard/delegate") || false
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const renderItem = (
    item: Item,
    index: number,
    onChangeItems: () => void,
  ) => {
    const isOpen = item.id === openItemId

    return (
      <SortableListItem
        item={item}
        key={item.id}
        isExpanded={isOpen}
        onChangeItems={onChangeItems}
        handleDrag={() => { }}
        className="my-2 "
        order={index}
        renderExtra={(item) => (
          <div
            key={`${isOpen}`}
            className={cn(
              "flex flex-col items-center justify-center gap-2 ",
              isOpen ? "w-full py-1 px-1" : ""
            )}
          >
            <motion.button
              layout
              onClick={() => setOpenItemId(!isOpen ? item.id : null)}
              key="collapse"
              className={cn(
                // isOpen
                "absolute right-3 top-[0.9rem] z-10 "
                // : "relative z-10 ml-auto mr-3 "
              )}
            >
              {isOpen ? (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 1.95,
                  }}
                >
                  <XIcon className="size-4 text-foreground" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 0.95,
                  }}
                >
                  <InfoIcon className="size-4 text-foreground" />
                </motion.span>
              )}
            </motion.button>

            <LayoutGroup id={`${item.id}`}>
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div className="flex w-full flex-col">
                    <motion.div
                      className="flex w-full flex-col items-start space-y-4"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      key={`description-${item.id}`}
                      transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 0.2,
                      }}
                    >
                      <p className={cn("tracking-tighter")}>
                        {item.description}
                      </p>

                      <p className='text-muted-foreground italic'>
                        Atenção: Esse conselho será realizado em {mapValue(item.language)?.toLowerCase()}
                      </p>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      />
    )
  }

  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Preferência de Comitê/Conselho</DrawerTitle>
            <DrawerDescription>
              Arraste os items para mudá-los de ordem
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <RemixForm onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
              <FormField
                control={form.control}
                name="councilPreference"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{!error ? "Conselhos/Comitês" : error.message}</FormLabel>

                    <ScrollArea className="max-h-[50vh] overflow-scroll">
                      <SortableList
                        items={items}
                        setItems={setItems}
                        onChangeItems={(items) => { field.onChange(items) }}
                        renderItem={renderItem}
                      />
                    </ScrollArea>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading || (!firstTime && !form.formState.isDirty)} size="xl" className='w-full'>
                {isLoading && <Loader2 className="animate-spin" />} Confirmar
              </Button>
            </RemixForm>
          </Form>
        </DrawerContent>
      </Drawer >
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='lg:max-w-[50%] md:max-w-[60%] sm:max-w-[90%]'>
        <DialogHeader>
          <DialogTitle>Preferência de Comitê/Conselho</DialogTitle>
          <DialogDescription>
            Arraste os items para mudá-los de ordem
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <RemixForm onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
            <FormField
              control={form.control}
              name="councilPreference"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>{!error ? "Conselhos/Comitês" : error.message}</FormLabel>

                  <SortableList
                    items={items}
                    setItems={setItems}
                    onChangeItems={(items) => { field.onChange(items) }}
                    renderItem={renderItem}
                  />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading || (!firstTime && !form.formState.isDirty)} size="xl" className=''>
              {isLoading && <Loader2 className="animate-spin" />} Confirmar
            </Button>
          </RemixForm>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


interface UsePreferenceForm {
  actionData: any
  userPreferences: Item[]
  defaultCouncils: Item[]
  userId: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}


function usePreferenceForm({ actionData, userPreferences, defaultCouncils, userId, isDialogOpen, setIsDialogOpen }: UsePreferenceForm) {
  const submit = useSubmit()
  const form = useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      councilPreference: userPreferences.length > 0 ? userPreferences : defaultCouncils,
    },
  })
  const [items, setItems] = React.useState(form.getValues("councilPreference"))

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      actionData = null
      return;
    }

    if (actionData?.errors) {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as PreferenceSchemaKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as PreferenceSchemaKeys)
      })
    }

    if (actionData?.success) {
      toast("Preferências atualizadas!", {
        icon: <CheckIcon className="text-primary" />
      })
      setIsDialogOpen(false)
      if (actionData?.userPreferences) form.reset({ councilPreference: actionData.userPreferences })
    }
  }, [actionData])

  function onSubmit(values: PreferenceSchema) {
    submit({ data: JSON.stringify(values), userId }, { method: "POST" })
  }

  return { items, setItems, form, onSubmit }
}
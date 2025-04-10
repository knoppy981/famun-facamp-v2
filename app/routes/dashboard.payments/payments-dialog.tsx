import React from 'react'
import { Form as RemixForm, useSubmit, useActionData, useNavigation } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from "zod"

import { useMediaQuery } from '~/hooks/useMediaQuery'
import { type PaymentSelectDataType, paymentSelectFormSchema } from './route'

import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer"
import { Separator } from '~/components/ui/separator'


interface SelectPaymentsDialog {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  delegationPaymentStatus: {
    delegates: {
      paid: boolean;
      remaining: number;
    };
    advisors: {
      paid: boolean;
      remaining: number;
    };
    status: "pending" | "expired" | "paid";
    totalNumberPayments: number;
  }
}


export default function SelectPaymentsDialog({ isDialogOpen, setIsDialogOpen, delegationPaymentStatus }: SelectPaymentsDialog) {
  const actionData = useActionData()
  const { form, onSubmit } = useSelectPaymentForm(actionData)
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/dashboard/payments") || false
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Pagamento</DrawerTitle>
            <DrawerDescription>
              Selecione a quantidade de pagamentos a serem realizados
            </DrawerDescription>
          </DrawerHeader>

          <PaymentsForm
            delegationPaymentStatus={delegationPaymentStatus}
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </DrawerContent>
      </Drawer >
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento</DialogTitle>
          <DialogDescription>
            Selecione a quantidade de pagamentos a serem realizados
          </DialogDescription>
        </DialogHeader>

        <PaymentsForm
          delegationPaymentStatus={delegationPaymentStatus}
          form={form}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}


interface PaymentsForm {
  form: UseFormReturn<PaymentSelectDataType>
  onSubmit: (values: PaymentSelectDataType) => void
  isLoading: boolean
  delegationPaymentStatus: {
    delegates: {
      paid: boolean;
      remaining: number;
    };
    advisors: {
      paid: boolean;
      remaining: number;
    };
    status: "pending" | "expired" | "paid";
    totalNumberPayments: number;
  }
}


function PaymentsForm({ form, onSubmit, isLoading, delegationPaymentStatus }: PaymentsForm) {
  return (
    <Form {...form}>
      <RemixForm
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 mt-4'
      >
        <div className='flex flex-col gap-2'>
          <FormField
            disabled={delegationPaymentStatus.delegates.paid}
            control={form.control}
            name="delegatesPayments"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Pagamentos de Delegados" : error.message}
                </FormLabel>

                <FormControl>
                  <Input type="number" min={0} max={delegationPaymentStatus.delegates.remaining} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            disabled={delegationPaymentStatus.advisors.paid}
            control={form.control}
            name="advisorsPayments"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Pagamentos de Advisors" : error.message}
                </FormLabel>

                <FormControl>
                  <Input type="number" min={0} max={delegationPaymentStatus.advisors.remaining} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator className='mt-6 mb-2' />

          <FormField
            control={form.control}
            name="coupon"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Código Promocional" : error.message}
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} size="xl" className='w-full'>
          {isLoading && <Loader2 className="animate-spin" />} Seguir para o Pagamento
        </Button>
      </RemixForm>
    </Form>
  )
}


function useSelectPaymentForm(actionData: any) {
  const submit = useSubmit()
  const form = useForm<PaymentSelectDataType>({
    resolver: zodResolver(paymentSelectFormSchema),
    defaultValues: {
      delegatesPayments: 0,
      advisorsPayments: 0,
      coupon: ""
    },
  })

  React.useEffect(() => {
    if (actionData?.errors) {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as "delegatesPayments" | "advisorsPayments" | "coupon", {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as "delegatesPayments" | "advisorsPayments" | "coupon")
      })
    }
  }, [actionData, form])

  function onSubmit(values: z.infer<typeof paymentSelectFormSchema>) {
    submit(values, { method: "POST" })
  }

  return { form, onSubmit }
}

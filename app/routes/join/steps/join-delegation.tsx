import React from "react";
import { Form as RemixForm, useSubmit } from "@remix-run/react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "~/lib/zod-error-map"
import { z } from "zod"

import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/components/ui/input-otp"
import { Loader2 } from "lucide-react";


const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: "O código deve ter 6 dígitos" })
})


type CreateDelegationStepKeys = "code"


export default function JoinDelegationStep({ formHiddenInputs, data, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
  const { form, onSubmit } = useJoinDelegationForm(data, actionData, formHiddenInputs, step)
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)

  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <h1 className="text-3xl">
          Entrar Delegação
        </h1>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código da Delegação</FormLabel>
                <FormControl>
                  <InputOTP autoFocus maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Digite o código da sua delegação.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoading} size="xl" onClick={setButtonClicked}>
            {showLoadingSpinner && <Loader2 className="animate-spin" />} Próximo
          </Button>
        </div>
      </RemixForm>
    </Form>
  )
}


function useJoinDelegationForm(data: any, actionData: any, formHiddenInputs: { [key: string]: number | string; }, step: number) {
  const submit = useSubmit()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // add values for the multi step form
    submit({ data: JSON.stringify(values), step, ...formHiddenInputs, action: "next" }, { method: "post" })
  }

  React.useEffect(() => {
    if (actionData?.errors) {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as CreateDelegationStepKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as CreateDelegationStepKeys)
      })
    }
  }, [actionData, form])

  return { form, onSubmit }
}
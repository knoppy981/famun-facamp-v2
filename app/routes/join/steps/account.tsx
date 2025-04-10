import React from "react";
import { Form as RemixForm, useSubmit } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import "~/lib/zod-error-map"
import { z } from "zod"

import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Loader2 } from "lucide-react";


export const formSchema = z.object({
  email: z
    .string()
    .nonempty()
    .email(),
  name: z
    .string()
    .nonempty()
    .min(8),
  password: z
    .string()
    .nonempty()
    .min(8),
  confirmPassword: z
    .string()
    .nonempty()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas diferentes",
  path: ["confirmPassword"],
});


export type AccountStepType = z.infer<typeof formSchema>

type AccountStepKeys = "name" | "email" | "password" | "confirmPassword"


export default function AccountStep({ data, formHiddenInputs, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)
  const { form, onSubmit } = useAccountForm(data, actionData, formHiddenInputs, step)

  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <h2 className="text-3xl">
          Criar Conta
        </h2>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "E-mail" : error.message}</FormLabel>

                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Nome" : error.message}</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>{!error ? "Senha" : error.message}</FormLabel>

                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>{!error ? "Confirme a Senha" : error.message}</FormLabel>

                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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


function useAccountForm(data: any, actionData: any, formHiddenInputs: { [key: string]: number | string; }, step: number) {
  const submit = useSubmit()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email || "",
      name: data?.name || "",
      password: data?.password || "",
      confirmPassword: data?.confirmPassword || "",
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
        form.setError(field as AccountStepKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as AccountStepKeys)
      })
    }
  }, [actionData, form])

  return { form, onSubmit }
}
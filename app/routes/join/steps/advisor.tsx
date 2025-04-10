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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";


export const formSchema = z.object({
  advisorRole: z
    .enum(["teacher", "coordinator", "principal", "other"]),
  facebook: z
    .string()
    .optional(),
  instagram: z
    .string()
    .optional(),
  linkedin: z
    .string()
    .optional(),
})

export type AdvisorStepType = z.infer<typeof formSchema>

type AdvisorStepKeys = "advisorRole" | "facebook" | "instagram" | "linkedin"


export default function AdvisorStep({ formHiddenInputs, data, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)
  const { form, onSubmit } = useAccountForm(data, actionData, formHiddenInputs, step)

  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <h1 className="text-3xl">
          Dados de Delegado
        </h1>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="advisorRole"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Posição como Professor(a) Orientador(a)" : error.message}</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger autoFocus>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[{ id: 'teacher', label: 'Professor' }, { id: 'coordinator', label: 'Coordenador' }, { id: 'principal', label: 'Diretor' }, { id: 'other', label: 'Outro' }].map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Facebook" : error.message}</FormLabel>

                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Instagram" : error.message}</FormLabel>

                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Linkedin" : error.message}</FormLabel>

                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
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


function useAccountForm(data: any, actionData: any, formHiddenInputs: { [key: string]: number | string; }, step: number) {
  const submit = useSubmit()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      advisorRole: data?.advisorRole || "",
      facebook: data?.facebook || "",
      instagram: data?.instagram || "",
      linkedin: data?.linkedin || "",
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
        form.setError(field as AdvisorStepKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as AdvisorStepKeys)
      })
    }
  }, [actionData, form])

  return { form, onSubmit }
}
import React from "react";
import { Form as RemixForm, useSubmit } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import "~/lib/zod-error-map"
import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";

import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { PhoneInput } from "~/components/ui/phone-input";
import { Checkbox } from "~/components/ui/checkbox";


export const formSchema = z.object({
  languagesSimulates: z
    .array(z.enum(["portuguese", "english", "spanish"])),
  educationLevel: z
    .enum(["university", "school", "prep_school"]),
  currentYear: z
    .string()
    .nonempty(),
  emergencyContactName: z.string().nonempty(),
  emergencyContactPhoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Telefone inválido" }),
})

export type DelegateStepType = z.infer<typeof formSchema>

type DelegateStepKeys = "languagesSimulates" | "educationLevel" | "currentYear" | "emergencyContactName" | "emergencyContactPhoneNumber"


export default function DelegateStep({ formHiddenInputs, data, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
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
            name="educationLevel"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-3 sm:space-y-2">
                <FormLabel>{!error ? "Nível de Escolaridade" : error.message}</FormLabel>
                <FormControl>
                  <RadioGroup
                    autoFocus
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {[{ id: 'university', label: 'Universidade' }, { id: 'school', label: 'Escola' }, { id: 'prep_school', label: 'Cursinho' }].map((item) => (
                      <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentYear"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Ano em que está cursando" : error.message}</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languagesSimulates"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-3 sm:space-y-2">
                <FormLabel>{!error ? "Idiomas que pode simular" : error.message}</FormLabel>
                {[{ id: 'english', label: 'Inglês' }, { id: 'portuguese', label: 'Português' }, { id: 'spanish', label: 'Espanhol' }].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="languagesSimulates"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id as "english" | "portuguese" | "spanish")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <div className='text-sm'>
            Contato de Emergência
          </div>

          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Nome" : error.message}</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContactPhoneNumber"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Telefone" : error.message}</FormLabel>

                <FormControl>
                  <PhoneInput defaultCountry="BR" {...field} />
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
      languagesSimulates: data?.languagesSimulates || "",
      currentYear: data?.currentYear || "",
      educationLevel: data?.educationLevel || "",
      emergencyContactName: data?.emergencyContactName || "",
      emergencyContactPhoneNumber: data?.emergencyContactPhoneNumber || ""
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
        form.setError(field as DelegateStepKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as DelegateStepKeys)
      })
    }
  }, [actionData, form])

  return { form, onSubmit }
}
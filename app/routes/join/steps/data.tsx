import React from "react";
import { Form as RemixForm, useSubmit } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import "~/lib/zod-error-map"
import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";

import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { PhoneInput } from "~/components/ui/phone-input";
import { DateTimePicker } from "~/components/ui/date-picker";
import { CountryDropdown } from "~/components/ui/country-dropdown";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";


const today = new Date();
today.setHours(0, 0, 0, 0)

export const formSchema = z.object({
  type: z
    .enum(["delegate", "advisor"], { message: "Selecione uma opcão" }),
  sex: z
    .enum(["masc", "fem", "other"]),
  socialName: z
    .string()
    .optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Telefone inválido" }),
  birthDate: z
    .coerce
    .date()
    .refine((d) => d < today, {
      message: "Data de nascimento deve ser anterior a hoje",
    }),
  nationality: z
    .string()
    .nonempty(),

  // Documents (conditionally required based on nationality)
  cpf: z.string().optional(),
  rg: z.string().optional(),
  passport: z.string().optional(),

  // Dietary info
  diet: z.enum(['vegan', 'vegetarian', 'other']).nullable().optional(),
  foodRestriction: z.string().optional(),
})
  .refine(
    (data) => {
      if (data.nationality === "BRA") {
        return data.rg;
      }
      return true
    },
    {
      message: "RG obrigatório",
      path: ["rg"],
    }
  )
  .refine(
    (data) => {
      if (data.nationality !== "BRA") {
        return data.passport;
      }
      return true
    },
    {
      message: "Passaporte obrigatório",
      path: ["passport"],
    }
  )

export type DataStepType = z.infer<typeof formSchema>

type DataStepKeys = "type" | "socialName" | "phoneNumber" | "birthDate" | "sex" | "nationality" | "rg" | "cpf" | "passport" | "diet" | "foodRestriction"


export default function DataStep({ formHiddenInputs, data, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)
  const { form, onSubmit } = useAccountForm(data, actionData, formHiddenInputs, step)

  const nationality = form.watch("nationality");

  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <h1 className="text-3xl">
          Dados do participante
        </h1>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Como você vai participar?" : error.message}</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger autoFocus>
                      <SelectValue placeholder="Selecione Delegado ou Advisor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[{ id: 'delegate', label: 'Delegado' }, { id: 'advisor', label: 'Advisor' }].map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialName"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Nome Social" : error.message}</FormLabel>

                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{!error ? "Data de Nascimento" : error.message}</FormLabel>

                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  hideTime
                />

                <FormDescription>
                  A data de nascimento é usada para calcular sua idade.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Sexo" : error.message}</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[{ id: 'masc', label: 'Masculino' }, { id: 'fem', label: 'Feminino' }, { id: 'other', label: 'Outro' }].map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="nationality"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "País de Nascimento" : error.message}</FormLabel>

                <CountryDropdown
                  placeholder="Selecione um País"
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.alpha3);
                  }}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Telefone" : error.message}</FormLabel>

                <FormControl>
                  <PhoneInput defaultCountry="BR" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {nationality !== undefined && (nationality === "BRA" ?
            <div className="grid grid-cols-2 gap-3 items-end">
              <FormField
                control={form.control}
                name="rg"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{!error ? "RG" : error.message}</FormLabel>

                    <FormControl>
                      <Input placeholder="" type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{!error ? "CPF" : error.message}</FormLabel>

                    <FormControl>
                      <Input placeholder="Opcional" type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            :
            <FormField
              control={form.control}
              name="passport"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>{!error ? "Passaporte" : error.message}</FormLabel>

                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>

                  <FormDescription>
                    Número do passaporte de estrangeiros é obrigatório
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="diet"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-3 sm:space-y-2">
                <FormLabel>{!error ? "Dieta" : error.message}</FormLabel>
                {[{ id: 'vegan', label: 'Vegano' }, { id: 'vegetarian', label: 'Vegetariano' }, { id: 'other', label: 'Outra' }].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="diet"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value === item.id}
                              onCheckedChange={(checked) => {
                                return field.onChange(checked ? item.id : null)
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foodRestriction"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Restrições Alimentares" : error.message}</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormDescription>
                  Para melhor experiência, informe sua dieta e suas restrições alimentares.
                </FormDescription>
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
      type: data?.type || "",
      sex: data?.sex || "",
      socialName: data?.socialName || "",
      phoneNumber: data?.phoneNumber || "",
      birthDate: data?.birthDate || "",
      nationality: data?.nationality || "",
      cpf: data?.cpf || "",
      rg: data?.rg || "",
      passport: data?.passport || "",
      diet: data?.diet || undefined,
      foodRestriction: data?.foodRestriction || ""
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
        form.setError(field as DataStepKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as DataStepKeys)
      })
    }
  }, [actionData, form])

  return { form, onSubmit }
}
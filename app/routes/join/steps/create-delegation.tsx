import React from "react";
import { Form as RemixForm, useSubmit } from "@remix-run/react";

import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import "~/lib/zod-error-map"
import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { PhoneInput } from "~/components/ui/phone-input";
import { CountryDropdown } from "~/components/ui/country-dropdown";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";


export const formSchema = z.object({
  school: z
    .string()
    .min(3),
  participationMethod: z
    .enum(["school", "university"]),
  delegationPhoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Telefone inválido" }),
  maxDelegates: z.coerce
    .number()
    .gte(1)
    .lte(10),
  maxAdvisors: z.coerce
    .number()
    .gte(1),
  address: z.object({
    address: z
      .string()
      .nonempty()
      .min(3),
    country: z
      .string()
      .nonempty(),
    postalCode: z
      .string()
      .nonempty()
      .min(8),
    state: z
      .string()
      .nonempty()
      .min(2),
    city: z
      .string()
      .nonempty()
      .min(3)
  })
})


export type CreateDelegationStepType = z.infer<typeof formSchema>

type CreateDelegationStepKeys = "school" | "participationMethod" | "delegationPhoneNumber" | "maxDelegates" | "maxAdvisors" | "address.address" | "address.country" | "address.postalCode" | "address.state" | "address.city"


export default function CreateDelegationStep({ formHiddenInputs, data, isLoading, actionData, step }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, actionData: any, step: number }) {
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)
  const { form, onSubmit } = useCreateDelegationForm(data, actionData, formHiddenInputs, step)

  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
        <h1 className="text-3xl">
          Criar Delegação
        </h1>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="school"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Escola/Universidade" : error.message}
                </FormLabel>

                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participationMethod"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Tipo de Delegação" : error.message}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione Escola ou Universidade" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {[{ id: 'school', label: 'Escola' }, { id: 'university', label: 'Universidade' }].map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="delegationPhoneNumber"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Telefone" : error.message}
                </FormLabel>

                <FormControl>
                  <PhoneInput defaultCountry="BR" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              control={form.control}
              name="maxDelegates"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {!error ? "Número de Delegados" : error.message}
                  </FormLabel>

                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAdvisors"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {!error ? "Número de Advisors" : error.message}
                  </FormLabel>

                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="address.address"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Endereço" : error.message}
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "Cidade" : error.message}
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {!error ? "Código Postal" : error.message}
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>
                    {!error ? "Estado" : error.message}
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address.country"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>
                  {!error ? "País" : error.message}
                </FormLabel>

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

function useCreateDelegationForm(data: any, actionData: any, formHiddenInputs: { [key: string]: number | string; }, step: number) {
  const submit = useSubmit()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: data?.school || "",
      participationMethod: data?.participationMethod || null,
      delegationPhoneNumber: data?.delegationPhoneNumber || "",
      maxDelegates: data?.maxDelegates || 0,
      maxAdvisors: data?.maxAdvisors || 0,
      address: data?.address ?? {
        address: "",
        country: "",
        postalCode: "",
        state: "",
        city: "",
      }
    },
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
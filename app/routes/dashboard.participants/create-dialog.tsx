import React from 'react'
import { Form as RemixForm, useSubmit, useActionData, useNavigation } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from "sonner"

import { useMediaQuery } from '~/hooks/useMediaQuery'
import { formSchema, ParticipantDataType, ParticipantFormKeys } from './route'

import { CheckCircle2Icon, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { DateTimePicker } from '~/components/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { Checkbox } from '~/components/ui/checkbox'
import { CountryDropdown } from '~/components/ui/country-dropdown'
import { PhoneInput } from '~/components/ui/phone-input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer"
import { ScrollArea } from '~/components/ui/scroll-area'


interface CreateDialog {
  delegationId: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  delegationSubscriptionStatus: {
    delegates: {
      completed: boolean;
      remaining: number;
    };
    advisors: {
      completed: boolean;
      remaining: number;
    };
    status: "completed" | "pending" | "expired";
    totalNumberSubscriptions: number;
  }
}


export default function CreateDialog({ delegationId, isDialogOpen, setIsDialogOpen, delegationSubscriptionStatus }: CreateDialog) {
  const navigation = useNavigation();
  const actionData = useActionData()
  const { form, onSubmit } =
    useParticipantsCreateForm({ actionData, isDialogOpen, setIsDialogOpen, delegatesRemaining: delegationSubscriptionStatus.delegates.remaining, delegationId })

  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/dashboard/participants") || false
  const nationality = form.watch("nationality");
  const participantType = form.watch("type");
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Cadastro</DrawerTitle>
            <DrawerDescription>
              Selecione o tipo de participante
            </DrawerDescription>
          </DrawerHeader>

          <CreateForm
            delegationSubscriptionStatus={delegationSubscriptionStatus}
            form={form}
            isLoading={isLoading}
            nationality={nationality}
            onSubmit={onSubmit}
            participantType={participantType}
          />
        </DrawerContent>
      </Drawer >
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='max-w-[90%]'>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>
            Selecione o tipo de participante
          </DialogDescription>
        </DialogHeader>

        <CreateForm
          delegationSubscriptionStatus={delegationSubscriptionStatus}
          form={form}
          isLoading={isLoading}
          nationality={nationality}
          onSubmit={onSubmit}
          participantType={participantType}
        />
      </DialogContent>
    </Dialog>
  )
}


interface CreateForm {
  nationality: string
  participantType: "delegate" | "advisor"
  form: UseFormReturn<ParticipantDataType>
  onSubmit: (values: ParticipantDataType) => void
  isLoading: boolean
  delegationSubscriptionStatus: {
    delegates: {
      completed: boolean;
      remaining: number;
    };
    advisors: {
      completed: boolean;
      remaining: number;
    };
    status: "completed" | "pending" | "expired";
    totalNumberSubscriptions: number;
  }
}


function CreateForm({ nationality, participantType, form, onSubmit, isLoading, delegationSubscriptionStatus }: CreateForm) {
  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        <ScrollArea className="max-h-[50vh] sm:max-h-none overflow-scroll">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 m-1'>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{!error ? "Metodo de participação" : error.message}</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger autoFocus>
                          <SelectValue placeholder="Selecione Delegado ou Advisor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          [
                            ...(delegationSubscriptionStatus.delegates.remaining > 0 ? [{ id: 'delegate', label: 'Delegado' }] : []),
                            ...(delegationSubscriptionStatus.advisors.remaining > 0 ? [{ id: 'advisor', label: 'Advisor' }] : [])
                          ]
                            .map((item) => (
                              <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>{!error ? "E-mail" : error.message}</FormLabel>

                    <FormControl>
                      <Input {...field} />
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
                                    return field.onChange(checked ? item.id : undefined)
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

            <div className='space-y-3'>
              {participantType === "delegate" ?
                <>
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="space-y-3 sm:space-y-2">
                        <FormLabel>{!error ? "Nível de Escolaridade" : error.message}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                          >
                            {[{ id: 'university', label: 'Universidade' }, { id: 'school', label: 'Escola' }, { id: 'prep_school', label: 'Cursinho' }].map((item) => (
                              <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem checked={field.value?.includes(item.id as "university" | "school" | "prep_school")} value={item.id} />
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
                                        if (Array.isArray(field.value)) {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                        }
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
                </>
                :
                <>
                  <FormField
                    control={form.control}
                    name="advisorRole"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem>
                        <FormLabel>{!error ? "Posição como Professor(a) Orientador(a)" : error.message}</FormLabel>

                        <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
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
                </>
              }
            </div>
          </div>
        </ScrollArea>

        <Button type="submit" disabled={isLoading} size="xl" className='sm:w-auto w-full'>
          {isLoading && <Loader2 className="animate-spin" />} Adicionar Participante
        </Button>
      </RemixForm>
    </Form>
  )
}


interface UseParticipantsCreateForm {
  actionData: any
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  delegationId: string
  delegatesRemaining: number
}


function useParticipantsCreateForm({ actionData, isDialogOpen, setIsDialogOpen, delegationId, delegatesRemaining }: UseParticipantsCreateForm) {
  const submit = useSubmit()
  const form = useForm<ParticipantDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: userDefaultValues(delegatesRemaining > 0 ? 'delegate' : 'advisor')
  })

  React.useEffect(() => {
    if (actionData?.errors && actionData?.type === "create") {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as ParticipantFormKeys, {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as ParticipantFormKeys)
      })
    }

    if (actionData?.success && actionData?.type === "create") {
      setIsDialogOpen(false);
      toast("Participante adicionado!", {
        description: `Logo menos ${actionData?.createdUser?.name} receberá um e-mail confirmando sua inscrição!`,
        icon: <CheckCircle2Icon className="text-primary" />
      })

      form.reset(userDefaultValues(delegatesRemaining > 0 ? 'delegate' : 'advisor'))
    }
  }, [actionData, form])

  function onSubmit(values: ParticipantDataType) {
    submit({ data: JSON.stringify(values), delegationId }, { method: "POST" })
  }

  return { form, onSubmit }
}


function userDefaultValues(type: "delegate" | "advisor") {
  return {
    name: "",
    email: "",
    sex: undefined,
    socialName: "",
    phoneNumber: "",
    birthDate: new Date(),
    nationality: "",
    cpf: "",
    rg: "",
    passport: "",
    diet: undefined,
    foodRestriction: "",

    type: type,

    currentYear: undefined,
    educationLevel: undefined,
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",
    languagesSimulates: [],

    advisorRole: undefined,
    facebook: "",
    instagram: "",
    linkedin: ""
  }
}
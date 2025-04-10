import React from 'react'
import { Form as RemixForm, useSubmit, useActionData, useNavigation } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from "sonner"

import { useMediaQuery } from '~/hooks/useMediaQuery'
import { formSchema, ParticipantDataType, ParticipantFormKeys } from './route'
import { User } from '~/models/user.server'
import { nullsToUndefined } from '~/lib/utils'

import { CheckIcon, Loader2 } from 'lucide-react'
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


interface EditDialog {
  user: User
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


export default function EditDialog({ user, delegationId, isDialogOpen, setIsDialogOpen, delegationSubscriptionStatus }: EditDialog) {
  const actionData = useActionData()
  const { form, onSubmit, participantType } = useParticipantsEditForm({ actionData, delegationId, user, isDialogOpen, setIsDialogOpen })
  const navigation = useNavigation();
  const defaultParticipantType = user.type

  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/dashboard/participants") || false
  const nationality = form.watch("nationality");
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Editar Participante</DrawerTitle>
            <DrawerDescription>
              Editando: {user.name}
            </DrawerDescription>
          </DrawerHeader>

          <EditForm
            delegationSubscriptionStatus={delegationSubscriptionStatus}
            form={form}
            isLoading={isLoading}
            nationality={nationality}
            onSubmit={onSubmit}
            participantType={participantType}
            defaultParticipantType={defaultParticipantType}
          />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='max-w-[90%]'>
        <DialogHeader>
          <DialogTitle>Editar Participante</DialogTitle>
          <DialogDescription>
            Editando: {user.name}
          </DialogDescription>
        </DialogHeader>

        <EditForm
          delegationSubscriptionStatus={delegationSubscriptionStatus}
          form={form}
          isLoading={isLoading}
          nationality={nationality}
          onSubmit={onSubmit}
          participantType={participantType}
          defaultParticipantType={defaultParticipantType}
        />
      </DialogContent>
    </Dialog>
  )
}


interface EditForm {
  nationality: string
  participantType: "delegate" | "advisor"
  defaultParticipantType: "delegate" | "advisor"
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


function EditForm({ nationality, participantType, form, onSubmit, isLoading, delegationSubscriptionStatus, defaultParticipantType }: EditForm) {
  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        <ScrollArea className="max-h-[50vh] sm:max-h-none overflow-scroll">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 m-1'>
            <div className="space-y-3">
              {delegationSubscriptionStatus.status === "pending" ?
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
                              ...(delegationSubscriptionStatus.delegates.remaining > 0 || defaultParticipantType === "advisor" ? [{ id: 'delegate', label: 'Delegado' }] : []),
                              ...(delegationSubscriptionStatus.advisors.remaining > 0 || defaultParticipantType === "advisor" ? [{ id: 'advisor', label: 'Advisor' }] : [])
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
                :
                null
              }

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

        <Button type="submit" disabled={isLoading || !form.formState.isDirty} size="xl" className='sm:w-auto w-full'>
          {isLoading && <Loader2 className="animate-spin" />} Confirmar Alterações
        </Button>
      </RemixForm>
    </Form>
  )
}


interface UseParticipantsEditForm {
  actionData: any
  user: User
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  delegationId: string
}


function useParticipantsEditForm({ actionData, user, delegationId, isDialogOpen, setIsDialogOpen }: UseParticipantsEditForm) {
  const submit = useSubmit();

  // Store the original user type for reference
  const originalType = React.useRef<"delegate" | "advisor" | null>(null);

  // Create a properly typed defaultValues object from user data
  const defaultValues = React.useMemo(() => {
    if (user) {
      // Store the original user type when we first load user data
      if (!originalType.current) {
        originalType.current = user.type as "delegate" | "advisor";
      }
      return nullsToUndefined(user) as unknown as ParticipantDataType;
    }
    return userDefaultValues("delegate");
  }, [user]);

  const form = useForm<ParticipantDataType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange"
  });

  const participantType = form.watch("type");
  const previousType = React.useRef(participantType);

  // Handle type changes
  React.useEffect(() => {
    // Only run this effect when type actually changes, not on first render
    if (participantType !== previousType.current && previousType.current) {
      const userData = nullsToUndefined(user) as unknown as ParticipantDataType;

      // If switching back to original type, use a full form reset
      if (participantType === originalType.current) {
        form.reset(undefined, { keepDirty: false });
      }
      // Otherwise, just set specific fields based on the new type
      else {
        if (participantType === "delegate") {
          // Reset advisor fields
          form.setValue("advisorRole", undefined);
          form.setValue("facebook", "");
          form.setValue("instagram", "");
          form.setValue("linkedin", "");

          // Restore delegate fields with defined values
          form.setValue("languagesSimulates", user.languagesSimulates || []);
          form.setValue("educationLevel", user.educationLevel || undefined);
          form.setValue("currentYear", user.currentYear || "");
          form.setValue("emergencyContactName", user.emergencyContactName || "");
          form.setValue("emergencyContactPhoneNumber", user.emergencyContactPhoneNumber || "");
        } else if (participantType === "advisor") {
          // Reset delegate fields
          form.setValue("languagesSimulates", []);
          form.setValue("educationLevel", undefined);
          form.setValue("currentYear", "");
          form.setValue("emergencyContactName", "");
          form.setValue("emergencyContactPhoneNumber", "");

          // Restore advisor fields with defined values
          form.setValue("advisorRole", user.advisorRole || undefined);
          form.setValue("facebook", user.facebook || "");
          form.setValue("instagram", user.instagram || "");
          form.setValue("linkedin", user.linkedin || "");
        }
      }
    }

    // Update ref to current type for next change detection
    previousType.current = participantType;
  }, [participantType, user, form]);

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      actionData = null
      return;
    }

    if (actionData?.errors && actionData?.type === "edit") {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as ParticipantFormKeys, {
          type: "server",
          message: actionData.errors?.[field],
        });
        form.setFocus(field as ParticipantFormKeys);
      });
    }

    if (actionData?.success && actionData?.type === "edit") {
      setIsDialogOpen(false);
      toast("Mudanças salvas!", {
        icon: <CheckIcon className="text-primary" />
      });

      if (actionData?.updatedUser) {
        // When there's an updated user, store its type as the original type
        if (actionData.updatedUser.type) {
          originalType.current = actionData.updatedUser.type as "delegate" | "advisor";
        }
        form.reset(undefined, { keepDirtyValues: true });
      }
    }
  }, [actionData, form, setIsDialogOpen]);

  React.useEffect(() => {
    if (isDialogOpen && user) {
      // When dialog opens, store user type as original type and reset form
      originalType.current = user.type as "delegate" | "advisor";
      form.reset(nullsToUndefined(user) as unknown as ParticipantDataType);
    }
  }, [isDialogOpen, user, form]);

  function onSubmit(values: ParticipantDataType) {
    // Convert form values to server-side format (with nulls where needed)
    const serverData = {
      ...values,
      // Use explicit null for fields that should be sent to the server as null
      advisorRole: values.type === "advisor" ? values.advisorRole : null,
      educationLevel: values.type === "delegate" ? values.educationLevel : null,

      // For all other type-specific fields, we'll use the empty/undefined values
      currentYear: values.type === "delegate" ? values.currentYear : "",
      emergencyContactName: values.type === "delegate" ? values.emergencyContactName : "",
      emergencyContactPhoneNumber: values.type === "delegate" ? values.emergencyContactPhoneNumber : "",
      languagesSimulates: values.type === "delegate" ? values.languagesSimulates : [],
      facebook: values.type === "advisor" ? values.facebook : "",
      instagram: values.type === "advisor" ? values.instagram : "",
      linkedin: values.type === "advisor" ? values.linkedin : "",
    };

    submit({
      data: JSON.stringify(serverData),
      delegationId,
      updatingUserId: user.id
    }, { method: "POST" });
  }

  return { form, onSubmit, participantType };
}


function userDefaultValues(type: "delegate" | "advisor") {
  return {
    name: "",
    email: "",
    sex: "male" as "masc" | "fem" | "other" | undefined,
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
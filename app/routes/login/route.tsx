import React from "react";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form as RemixForm, Link, useSubmit, useActionData, useSearchParams, useNavigation } from "@remix-run/react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { verifyLogin } from "~/models/user.server";
import { cn, safeRedirect } from "~/lib/utils";
import { createAdminSession, createUserSession, getUserId } from "~/session.server";

import { Button } from "~/components/ui/button";
import { FormControl, Form, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import Navbar from "~/components/navbar";
import { verifyAdmin } from "~/models/admin.server";


const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty()
    .email(),
  password: z
    .string()
    .nonempty(),
  rememberme: z
    .boolean()
    .default(false)
    .optional()
});


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberme = formData.get("rememberme") === "on";
  const redirectTo = formData.get("redirectTo") as string;

  const result = loginFormSchema.safeParse({ email, password, rememberme });
  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const user = await verifyLogin(email, password)
  const admin = await verifyAdmin(email, password)

  if (!user && !admin) {
    return json({ errors: { "password": "Senha ou e-mail incorretos" } }, { status: 400 });
  }

  return admin ?
    createAdminSession({
      request,
      adminId: admin.id
    }) :
    createUserSession({
      request,
      userId: user?.id as string,
      remember: rememberme,
      redirectTo: redirectTo ? safeRedirect(redirectTo as string) : "/dashboard",
    })
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  return userId ? redirect('/') : json({})
}


export default function LoginPage() {
  const navigation = useNavigation()
  const actionData = useActionData<any>()
  const [searchParams] = useSearchParams();
  const { form, onSubmit } = useLoginForm(actionData)

  const searchParamsString = searchParams.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : "";

  const redirectTo = searchParams.get("redirectTo") || "";
  const isLoading = navigation.state !== "idle" && navigation.formAction?.startsWith("/login") || false
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)

  return (
    <div className="h-svh sm:h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div
        className={cn(
          "p-8 w-screen sm:w-[28rem] sm:rounded-xl",
          "sm:shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
        )}
      >
        <Form {...form}>
          <RemixForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <h1 className="text-3xl">
              Inscrição
            </h1>

            <div className="space-y-3">
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
                name="rememberme"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Continuar Conectado
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button asChild variant="link" className="self-start px-0">
                <Link to="/examples/forms" className="text-card-foreground">Esqueceu a senha?</Link>
              </Button>
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <div className="flex flex-col">
              <Button type="submit" size="xl" onClick={setButtonClicked}>
                {showLoadingSpinner && <Loader2 className="animate-spin" />} Entrar
              </Button>

              <p className="text-sm self-center">
                Ainda não se inscreveu?
                <Button asChild variant="link" disabled={isLoading} className="px-1">
                  <Link to={`/join${queryString}`} className="text-card-foreground">Cadastrar</Link>
                </Button>
              </p>
            </div>
          </RemixForm>
        </Form>
      </div>
    </div>
  );
}


function useLoginForm(actionData: any) {
  const submit = useSubmit()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberme: false
    },
  })

  React.useEffect(() => {
    if (actionData?.errors) {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as "email" | "password" | "rememberme", {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as "email" | "password" | "rememberme")
      })
    }
  }, [actionData, form])

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    submit(values, { method: "POST" })
  }

  return { form, onSubmit }
}


function useShowLoadingSpinner(isLoading: boolean) {
  const [nextButtonClicked, setNextButtonClicked] = React.useState(false)

  React.useEffect(() => {
    if (!isLoading) setNextButtonClicked(false)
  }, [isLoading])

  const setButtonClicked = () => {
    setNextButtonClicked(true)
  }

  return { show: isLoading && nextButtonClicked, setButtonClicked }
}
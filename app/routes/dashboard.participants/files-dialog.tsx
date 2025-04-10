import React from 'react'
import { Form as RemixForm, useFetcher } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from "sonner"

import { useMediaQuery } from '~/hooks/useMediaQuery'

import { AlertTriangle, CheckIcon, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer"
import { z } from 'zod'


export type filesType = "Position Paper" | "Liability Waiver" // | "Payment Voucher"
export type selectedFilesType = {
  "Position Paper": string | boolean,
  "Liability Waiver": string | boolean,
  "Payment Voucher": string | boolean
}
export const documentsType = [
  { value: "Position Paper" as filesType, label: "Position Paper", type: "delegate" as "both" | "delegate" | "advisor" },
  { value: "Liability Waiver" as filesType, label: "Termo de Responsabilidade (Liability Waiver)", type: "both" as "both" | "delegate" | "advisor" }
  // { value: "Payment Voucher" as filesType, label: "Comprovante de pagamento", type: "both" as "both" | "delegate" | "advisor" },
]

// Define allowed MIME types for file uploads
const ALLOWED_FILE_TYPES = [
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/pdf", // .pdf
  "image/jpeg", // .jpg, .jpeg
  "image/png" // .png
];

// Main schema for the file submission form
export const fileSubmissionSchema = z.object({
  fileType: z.enum([
    "Position Paper",
    "Liability Waiver",
    // "Payment Voucher"
  ]),

  userId: z.string().min(1),

  file: z
    .instanceof(File, { message: "File upload is required" })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB max
      { message: "File size must be less than 10MB" }
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      {
        message: `File must be one of the following types: .doc, .docx, .pdf, .jpg, .jpeg, or .png`
      }
    )
});

export type FileSubmissionFormData = z.infer<typeof fileSubmissionSchema>;
export type FileSubmissionSchemaKeys = keyof FileSubmissionFormData;


interface FilesDialog {
  delegation: {
    [key: string]: any;
    users: {
      [key: string]: any;
      type: "advisor" | "delegate";
      files: Array<{
        contentType: string;
        type: string;
        fileName: string;
        size: number;
        createdAt: string;
      }>;
    }[];
  }
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function FilesDialog({ delegation, isDialogOpen, setIsDialogOpen }: FilesDialog) {
  const {
    form,
    onSubmit,
    isLoading,
    selectedFileName,
    handleFileChange,
    selectedUserType
  } = useFileSubmissionForm({ users: delegation.users, setIsDialogOpen });
  const isDesktop = useMediaQuery("(min-width: 768px)")


  if (!isDesktop) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left p-0 py-6">
            <DrawerTitle>Anexar Arquivos</DrawerTitle>
            <DrawerDescription>
              Anexar arquivos do participante selecionado
            </DrawerDescription>
          </DrawerHeader>

          <SubmitFileForm
            form={form}
            isLoading={isLoading}
            users={delegation.users}
            onSubmit={onSubmit}
            selectedFileName={selectedFileName}
            selectedUserType={selectedUserType}
            handleFileChange={handleFileChange}
          />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Anexar Arquivos</DialogTitle>
          <DialogDescription>
            Anexar arquivos do participante selecionado
          </DialogDescription>
        </DialogHeader>

        <SubmitFileForm
          form={form}
          isLoading={isLoading}
          users={delegation.users}
          onSubmit={onSubmit}
          selectedFileName={selectedFileName}
          selectedUserType={selectedUserType}
          handleFileChange={handleFileChange}
        />
      </DialogContent>
    </Dialog>
  )
}


interface SubmitFileForm {
  form: UseFormReturn<FileSubmissionFormData>
  onSubmit: (values: FileSubmissionFormData) => void
  users: {
    [key: string]: any;
    type: "advisor" | "delegate";
    files: Array<{
      contentType: string;
      type: string;
      fileName: string;
      size: number;
      createdAt: string;
    }>;
  }[];
  isLoading: boolean
  selectedFileName: string | null
  selectedUserType: "advisor" | "delegate" | null
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


function SubmitFileForm({ form, onSubmit, users, isLoading, selectedFileName, selectedUserType, handleFileChange }: SubmitFileForm) {
  return (
    <Form {...form}>
      <RemixForm onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="userId"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Participante" : error.message}</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileType"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{!error ? "Tipo do Documento" : error.message}</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      documentsType
                        .filter(doc => doc.type === "both" || doc.type === selectedUserType)
                        .map((item) => (
                          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>

                <FormDescription>
                  Obs: Os arquivos necessários mudam para delegado e advisor
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf,.jpg,.jpeg,image/jpeg,.png,image/png"
                  />
                </FormControl>
                {selectedFileName && (
                  <p className="text-sm text-gray-600">Selecionado: {selectedFileName}</p>
                )}
                <FormDescription>
                  Arquivos aceitos: .doc, .docx, .pdf, .jpg, .jpeg, .png (Tamanho máximo: 10MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading || !form.formState.isValid} size="xl" className='sm:w-auto w-full'>
          {isLoading && <Loader2 className="animate-spin" />} Subir Arquivo
        </Button>
      </RemixForm>
    </Form>
  )
}


interface UseFileSubmissionForm {
  users: {
    [key: string]: any;
    type: "advisor" | "delegate";
    files: Array<{
      contentType: string;
      type: string;
      fileName: string;
      size: number;
      createdAt: string;
    }>;
  }[];
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function useFileSubmissionForm({ users, setIsDialogOpen }: UseFileSubmissionForm) {
  const fetcher = useFetcher<any>()
  const isLoading = fetcher.state === "submitting";
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(null);
  const [selectedUserType, setSelectedUserType] = React.useState<"delegate" | "advisor" | null>(null);

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<FileSubmissionFormData>({
    resolver: zodResolver(fileSubmissionSchema),
    defaultValues: {
      fileType: undefined,
      userId: "",
      file: undefined
    },
  });

  // Handle file selection change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      form.setValue("file", file, { shouldValidate: true });
      setSelectedFileName(file.name);
    }
  };

  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "userId") setSelectedUserType(users.find((u => u.id === value.userId))?.type || null)
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  // Process form submission
  function onSubmit(values: FileSubmissionFormData) {
    const formData = new FormData();
    formData.append("file-type", values.fileType);
    formData.append("user-id", values.userId);
    formData.append("my-file", values.file);

    fetcher.submit(formData, { action: "/api/file", method: "POST", encType: "multipart/form-data" });
  }

  React.useEffect(() => {
    // Check if the fetcher has data and is in the 'done' state
    if (fetcher.state === 'idle' && fetcher.data) {
      const actionData = fetcher.data;

      // Handle server-side validation errors
      if (actionData?.generalError) {
        // Handle general form errors
        toast(actionData.generalError.message, {
          description: actionData.generalError.description,
          icon: <AlertTriangle className="h-4 w-4" />
        });
      }

      // Check for field-specific errors (if your backend returns them)
      if (actionData?.errors) {
        // Set server errors in form state
        Object.keys(actionData.errors).forEach((field) => {
          if (field !== "_form") {
            form.setError(field as FileSubmissionSchemaKeys, {
              type: "server",
              message: actionData.errors[field],
            });
          }
        });

        // Handle general form errors
        if (actionData.errors._form) {
          toast.error(actionData.errors._form);
        }
      }

      // Handle successful upload
      if (actionData?.success) {
        toast("Arquivo enviado com sucesso!", {
          description: `${actionData?.fileType} enviado com sucesso`,
          icon: <CheckIcon className="text-primary" />
        });

        // Reset the form
        form.reset();
        setSelectedFileName(null);
        setIsDialogOpen(false)
      }
    }
  }, [fetcher.state, fetcher.data, form])

  return {
    form,
    onSubmit,
    isLoading,
    selectedFileName,
    handleFileChange,
    selectedUserType
  };
}
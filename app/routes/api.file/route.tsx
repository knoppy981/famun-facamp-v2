import { ActionFunctionArgs, UploadHandler, json, unstable_parseMultipartFormData } from '@remix-run/node';
import { uploadFile } from '~/models/files.server';
import { requireUserId } from '~/session.server';


// Custom error class for more specific error handling
class FileUploadError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  try {
    // Initialize variables to store form data
    let selectedUserId: string | undefined;
    let fileType: string | undefined;
    let fileContentType: string | undefined;

    // Custom upload handler with improved error checking
    const uploadHandler: UploadHandler = async ({
      name,
      data,
      filename,
      contentType,
    }) => {
      // Validate input parameters
      if (!name) {
        throw new FileUploadError('Nome do campo inválido');
      }

      try {
        switch (name) {
          case 'my-file':
            // Validate file upload
            if (!filename) {
              throw new FileUploadError('Nenhum nome de arquivo fornecido');
            }
            fileContentType = contentType;
            break;

          case 'user-id':
          case 'file-type':
            // Process text fields
            const chunks = [];
            for await (const chunk of data) chunks.push(chunk);
            const decoder = new TextDecoder();
            const value = decoder.decode(chunks[0]).trim();

            if (!value) {
              throw new FileUploadError(`Valor em branco para ${name}`);
            }

            if (name === 'user-id') {
              selectedUserId = value;
            } else if (name === 'file-type') {
              fileType = value;
            }
            return value;

          default:
            return;
        }

        // For file upload, process the file
        if (name === 'my-file') {
          // Validate all required fields are present
          if (!selectedUserId) {
            throw new FileUploadError('ID de usuário é obrigatório');
          }
          if (!fileType) {
            throw new FileUploadError('Tipo de arquivo é obrigatório');
          }
          if (!fileContentType) {
            throw new FileUploadError('Tipo de conteúdo do arquivo é obrigatório');
          }

          // Get the file as a buffer
          const chunks = [];
          for await (const chunk of data) chunks.push(chunk);
          const buffer = Buffer.concat(chunks);

          // Validate file size (example: limit to 10MB)
          const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
          if (buffer.length > MAX_FILE_SIZE) {
            throw new FileUploadError('Tamanho do arquivo excede o limite máximo de 10MB');
          }

          // Upload the file
          await uploadFile({
            userId: selectedUserId, 
            stream: buffer, 
            filename: filename!, 
            type: fileType, 
            size: buffer.length, 
            contentType: fileContentType 
          });
        }

        return filename;
      } catch (error) {
        console.error('Erro no manipulador de upload:', error);
        throw error;
      }
    };

    // Parse multipart form data
    const form = await unstable_parseMultipartFormData(request, uploadHandler);

    // Validate form submission
    const uploadedFileName = form.get('my-file');
    const uploadedUserId = form.get('user-id');
    const uploadedFileType = form.get('file-type');

    if (!uploadedFileName || !uploadedUserId || !uploadedFileType) {
      throw new FileUploadError('Informações de upload de arquivo incompletas');
    }

    return json({
      success: true,
      fileName: uploadedFileName,
      userId: uploadedUserId,
      fileType: uploadedFileType
    }, { status: 200 });

  } catch (error) {
    // Centralized error handling
    console.error('File upload error:', error);

    if (error instanceof FileUploadError) {
      return json(
        { 
          success: false,
          generalError: { 
            message: 'Erro inesperado!', 
            description: error.message 
          } 
        },
        { status: error.statusCode }
      );
    }

    // Handle unexpected errors
    return json(
      { 
        success: false,
        generalError: { 
          message: 'Erro inesperado!', 
          description: 'Erro inesperado ao envio dos arquivos' 
        } 
      },
      { status: 500 }
    );
  }
};
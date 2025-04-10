import { prisma } from "~/db.server";

import type { File, User } from "@prisma/client";


export async function getFilesByUserId(userId: User["id"]) {
  return prisma.file.findMany({
    where: {
      userId
    },
  })
}

export async function uploadFile({ userId, stream, filename, type, size, contentType }:
  { userId: User["id"], stream: Buffer, filename: string | undefined, type: string, size: number, contentType: string }
) {
  if (filename === undefined) return

  return prisma.file.upsert({
    where: {
      type_userId: {
        type,
        userId
      }
    },
    update: {
      fileName: filename,
      type,
      size,
      stream,
      url: undefined,
      contentType,
    },
    create: {
      user: {
        connect: {
          id: userId
        }
      },
      fileName: filename,
      type,
      size,
      stream,
      url: undefined,
      contentType
    },
  })
}

export async function deleteFileById(fileId: File["id"]) {
  return prisma.file.delete({
    where: {
      id: fileId
    }
  })
}

export async function getFileBuffer(fileId: File["id"]) {
  return prisma.file.findUnique({
    where: {
      id: fileId
    },
    select: {
      stream: true,
      type: true,
      contentType: true,
      user: {
        select: {
          name: true
        }
      }
    }
  })
}
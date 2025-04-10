import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "~/models/user.server";
import { getAdminById, type Admin } from "~/models/admin.server"
import { getUserById } from "~/models/user.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";
const ADMIN_SESSION_KEY = "adminId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request,
): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}


// admin

export async function getAdminId(
  request: Request,
): Promise<Admin["id"] | undefined> {
  const session = await getSession(request);
  const adminId = session.get(ADMIN_SESSION_KEY);
  return adminId;
}

export async function requireAdminId(
  request: Request,
) {
  const adminId = await getAdminId(request);
  if (!adminId) {
    throw redirect("/login");
  }
  return adminId;
}

export async function requireAdmin(request: Request) {
  const adminId = await requireAdminId(request);

  const admin = await getAdminById(adminId);
  if (admin) return admin;

  throw await logout(request);
}

export async function createAdminSession({
  request,
  adminId,
}: {
  request: Request;
  adminId: string;
}) {
  const session = await getSession(request);
  session.set(ADMIN_SESSION_KEY, adminId);
  return redirect("/admin", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: undefined
      }),
    },
  });
}


export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}



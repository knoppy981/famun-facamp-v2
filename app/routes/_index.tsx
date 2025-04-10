import { redirect, LoaderFunctionArgs } from "@remix-run/node";

import { getAdminId, getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const adminId = await getAdminId(request)

  const url = new URL(request.url);
  const searchParams = url.search;

  if (userId || adminId) {
    return adminId ? redirect('/admin') : redirect(`/dashboard${searchParams}`);
  } else {
    return redirect(`/login${searchParams}`);
  }
};


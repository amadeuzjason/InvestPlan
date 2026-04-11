import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Refresh session agar token tidak expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /Main/* — redirect ke /login jika belum login
  if (pathname.startsWith("/Main") && !user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan mencoba akses /login atau /signup, redirect ke dashboard
  if ((pathname === "/login" || pathname === "/signup") && user) {
    const dashboardUrl = new URL("/Main/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

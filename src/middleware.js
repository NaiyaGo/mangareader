import { updateSession } from '@/lib/middleware'
export const config = {
  matcher:[
    '/api/supabase/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',

],
}

export async function middleware(request) {
    return await updateSession(request)
  }
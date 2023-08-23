import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {UI_URL} from "@/lib/constants";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|logout|login).*)',
    ],
};

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.next()
    }

    if (!request.cookies.get('access_token')?.value) {
        return NextResponse.redirect(new URL(`${UI_URL}/login`))
    }

    return NextResponse.next()
}
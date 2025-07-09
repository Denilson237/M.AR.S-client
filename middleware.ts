import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl

    const isProtectedRoute = protectedPatterns.some(pattern => pattern.test(pathname))
    const isAuthRoutes = authRoutes.includes(pathname)

    // Decrypt the session from the cookie
    const accessToken = (await cookies()).get('access_token')?.value
    const refreshToken = (await cookies()).get('refresh_token')?.value
    // TODO : Decrypt the session from the cookie
    // const session = await decrypt(cookie)

    // Redirect to /login if the user is not authenticated && !session?.userId
    if (isProtectedRoute && !accessToken) {
        const loginUrl = new URL(authRoutes[0], req.nextUrl.origin)
        //  Sauvegarde de l'URL demandée, Ne pas ajouter le paramètre redirect si on tente déjà d'accéder à /login
        if (!pathname.startsWith(authRoutes[0])) {
            loginUrl.searchParams.set('redirect', pathname);
        }
        return NextResponse.redirect(loginUrl)
    }

    // Redirect to DEFAULT_LOGIN_REDIRECT_PATH if the user is authenticated
    if (
        isAuthRoutes &&
        accessToken
    ) {
        const redirectUrl = req.nextUrl.searchParams.get('redirect')

        // Si un paramètre redirect existe et que c'est une URL valide de l'application
        if (redirectUrl) {
            return NextResponse.redirect(new URL(redirectUrl, req.nextUrl.origin))
        }
        // Sinon rediriger vers la page d'administration par défaut
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_PATH, req.nextUrl.origin))

    }

    return NextResponse.next()
}


// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

/**
 * An Array of routes that are available to the public.
 * Theses routes do not require authentication  
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
];

/**
 * An Array of routes that are used for authentication
 * Theses routes will redirect logged un users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/login",
    "/register",
];

/**
 * The prefix for API authentication reoutes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_PATH = "/dashboard";


const protectedPatterns = [
    /^\/admin(\/.*)?$/,    // Toutes les routes /admin/*
    /^\/dashboard(\/.*)?$/ // Toutes les routes /dashboard/*
]

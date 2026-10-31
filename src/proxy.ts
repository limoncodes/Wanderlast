import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: request.headers
    })

    const user = session?.user

    if (!user) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/add-destination',"/myBook", "/destination/:id"],
}
import { NextResponse } from 'next/server';

export function middleware(request: Request) {

  // protected route watchlist
  if (request.url.includes('/watchlist')) {
    if (!request.headers.get('cookie').includes('darkMode=true')) { 
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

}

export const config = {
  matcher: '/((?!api|_next/static|_next/image).*)', 
};

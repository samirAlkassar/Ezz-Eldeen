import { NextRequest, NextResponse } from 'next/server';
import setCookies from './actions/setCoockies';

console.log('MIDDLEWARE LOADED ✅');

export function middleware(request: NextRequest) {
  const { pathname, href } = request.nextUrl;
  const langCookie = request.cookies.get("lang");
  const lang = langCookie?.value ?? "en";

  if (!lang) {setCookies("lang", "en")};

  // console.log('┌──────────────────────────────────────────────────────────────┐');
  // console.log('│ MIDDLEWARE REQUEST                                           │');
  // console.log('├──────────────────────────────────────────────────────────────┤');
  // console.log(`│ Path       : ${pathname.padEnd(50)}│`);
  // console.log(`│ Full URL   : ${href.padEnd(50)}│`);
  // console.log(`│ Method     : ${request.method.padEnd(50)}│`);
  // console.log(`│ Time       : ${new Date().toISOString()} │`);
  // console.log(`│ language   : ${lang.padEnd(50)}│`);
  // console.log('└──────────────────────────────────────────────────────────────┘');


  return NextResponse.next();
}
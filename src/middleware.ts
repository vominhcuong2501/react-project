import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|fonts|images|favicon.ico).*)'],
};

const languages = ['en', 'vi'];
const countries = ['vn', 'jp', 'ca', 'in', 'us', 'gx'];

const setCookie = ({ res, language, country }) => {
  res.cookies.set('language', language);
  res.cookies.set('country', country);
};

export async function middleware(req) {
  const parsedPath = req.nextUrl?.pathname.split('/').filter((it) => !!it);

  const info = parsedPath[0];

  if (!info) {
    const url = req.nextUrl.clone();

    // set default language and country
    url.pathname = `/en-gx${url.pathname}`;
    const res = NextResponse.rewrite(url);
    setCookie({ res, language: 'en', country: 'gx' });
    return res;
  }

  const parsedInfo = info.split('-').filter((it) => !!it);

  const isValidation =
    !parsedInfo ||
    parsedInfo.length !== 2 ||
    !languages.find((it) => it === parsedInfo[0]) ||
    !countries.find((it) => it === parsedInfo[1]);

  if (isValidation) {
    const url = req.nextUrl.clone();
    url.pathname = `/en-gx${url.pathname}`;
    const res = NextResponse.rewrite(url);
    setCookie({ res, language: 'en', country: 'gx' });
    return res;
  }
  const res = NextResponse.next();

  setCookie({ res, language: info[0], country: info[1] });
  return res;
}

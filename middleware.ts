export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/planner/:path*', '/tracker/:path*', '/essays/:path*', '/timeline/:path*', '/resources/:path*'],
};


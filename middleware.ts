import {
  clerkMiddleware,
  createRouteMatcher
} from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Protect all dashboard routes
  '/seo-tool(.*)',  // Protect the SEO tool route
]);

// Make callback async and await auth()
export default clerkMiddleware(async (auth, req) => { 
  // Await the auth() call to get the session state
  const authResult = await auth(); 

  // Check if the route is protected and the user is not logged in
  if (isProtectedRoute(req) && !authResult.userId) {
    // Construct the sign-in URL, preserving the intended destination
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    // Redirect to the sign-in page
    return NextResponse.redirect(signInUrl);
  }

  // Allow requests to proceed
  return NextResponse.next();
}, { debug: true }); // Enable debug logging

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.+\\.[\\w]+$|_next).*)(/)?", 
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ],
};

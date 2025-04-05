import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from '@clerk/nextjs/server'; // Import User type

// Define a type for the user data we pass to the Header
export interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
  imageUrl: string;
  role: string;
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const authResult = await auth(); // Try awaiting auth()
  const userId = authResult?.userId;
  const user: User | null = await currentUser();

  if (!userId || !user) {
    // If no user is found, redirect to sign-in
    redirect("/sign-in");
  }
  
  // Determine user role (default to 'client' if not specified in publicMetadata)
  const userRole = (user.publicMetadata?.role as string) || 'client';

  // Prepare user data for client components (like Header)
  const userData: UserData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    role: userRole
  };
  
  // Redirect client users if they try to access the main dashboard path
  // They should likely go to a specific client dashboard, e.g., /dashboard/client
  // Note: This assumes your internal dashboard is at /dashboard/* and client at /dashboard/client/*
  // You might need more robust routing/middleware depending on your exact structure
  if (userRole === 'client') {
    // Example: Redirect clients trying to access `/dashboard` 
    // We might need to check the specific `pathname` if this layout serves multiple routes
    // For simplicity, let's assume they should go to '/dashboard/client/page'
    // A better approach might use middleware
    // redirect('/dashboard/client'); // Temporarily commenting out redirect for testing
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Pass userRole to Sidebar */}
      <Sidebar userRole={userRole} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Pass prepared userData to Header */}
        <Header user={userData} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Conditionally render dashboard based on role - simple example */}
          {/* More complex logic might involve separate routes or components */}
          {userRole === 'internal' ? (
            children // Assume the default children are for internal users
          ) : (
            // Redirect client users to their specific dashboard if they land here
            // Or render a specific client-view component directly
            // For now, let's assume the specific client route handles this
            children
          )}
        </main>
      </div>
    </div>
  );
} 
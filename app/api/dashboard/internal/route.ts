import { auth } from "@clerk/nextjs/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId, sessionClaims } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Check if user has internal role
  const role = sessionClaims?.role || "client";
  
  if (role !== "internal") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get high-level stats
    const [
      articlesResult,
      backlinksResult,
      technicalTasksResult,
      clientsResult,
      recentActivityResult
    ] = await Promise.all([
      // Count articles
      supabase
        .from("tasks")
        .select("id", { count: "exact" })
        .eq("task_type", "article"),
      
      // Count backlinks
      supabase
        .from("tasks")
        .select("id", { count: "exact" })
        .eq("task_type", "backlink"),
      
      // Count technical tasks
      supabase
        .from("tasks")
        .select("id", { count: "exact" })
        .eq("task_type", "technical"),
      
      // Count clients
      supabase
        .from("clients")
        .select("id", { count: "exact" }),
      
      // Recent activity
      supabase
        .from("tasks")
        .select("id, task_type, status, created_at, client_id, clients(client_name)")
        .order("created_at", { ascending: false })
        .limit(5)
    ]);
    
    // Handle errors
    if (
      articlesResult.error ||
      backlinksResult.error ||
      technicalTasksResult.error ||
      clientsResult.error ||
      recentActivityResult.error
    ) {
      throw new Error("Error fetching dashboard data");
    }
    
    return NextResponse.json({
      stats: {
        articles: articlesResult.count || 0,
        backlinks: backlinksResult.count || 0,
        technicalTasks: technicalTasksResult.count || 0,
        clients: clientsResult.count || 0,
      },
      recentActivity: recentActivityResult.data || [],
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
} 
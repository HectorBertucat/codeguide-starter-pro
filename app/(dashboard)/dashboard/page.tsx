'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  FileText,
  Link2,
  Wrench,
  Users,
  Calendar,
  Loader2,
} from "lucide-react";
import { fetchInternalDashboardData } from "@/services/dashboardService";

interface DashboardStats {
  articles: number;
  backlinks: number;
  technicalTasks: number;
  clients: number;
}

interface Activity {
  id: string;
  task_type: string;
  status: string;
  created_at: string;
  client_id: string;
  clients: { client_name: string } | null;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivity: Activity[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await fetchInternalDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getActivityDescription = (activity: Activity) => {
    const clientName = activity.clients?.client_name || "Unknown Client";
    switch (activity.task_type) {
      case 'article': return `Article task ${activity.status} for ${clientName}`;
      case 'backlink': return `Backlink task ${activity.status} for ${clientName}`;
      case 'technical': return `Technical task ${activity.status} for ${clientName}`;
      default: return `Task ${activity.status} for ${clientName}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-seoptimizer-primary" />
        </div>
      ) : error ? (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      ) : data ? (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Articles</CardTitle>
                  <FileText className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.stats.articles}</div>
                  <p className="text-xs text-gray-500">Total active</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
                  <Link2 className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.stats.backlinks}</div>
                  <p className="text-xs text-gray-500">Total active</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Technical Tasks</CardTitle>
                  <Wrench className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.stats.technicalTasks}</div>
                  <p className="text-xs text-gray-500">Total active</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.stats.clients}</div>
                  <p className="text-xs text-gray-500">Total active</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Monthly task completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[300px] items-center justify-center">
                    <BarChart className="h-24 w-24 text-gray-300" />
                    <p className="text-sm text-gray-500">Chart visualization coming soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across all clients</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {data.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4">
                          <div className="h-2 w-2 rounded-full bg-seoptimizer-primary"></div>
                          <div>
                            <p className="text-sm font-medium">
                              {getActivityDescription(activity)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(activity.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No recent activity found.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clients</CardTitle>
                <CardDescription>Manage and view all client information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Client management features coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>View and manage all client tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Task management features coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  );
} 
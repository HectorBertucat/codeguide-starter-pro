import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Link2, Wrench, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Client Dashboard</h2>
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

      <Tabs defaultValue="monthly-report" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly-report">Monthly Report</TabsTrigger>
          <TabsTrigger value="previous-reports">Previous Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly-report" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Content Status
                </CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Articles</div>
                <p className="text-xs text-gray-500">
                  2 Published, 1 In Progress
                </p>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">66%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "66%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Backlink Progress
                </CardTitle>
                <Link2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 Backlinks</div>
                <p className="text-xs text-gray-500">
                  4 Acquired, 1 Pending
                </p>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Technical Tasks
                </CardTitle>
                <Wrench className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8 Tasks</div>
                <p className="text-xs text-gray-500">
                  7 Completed, 1 In Progress
                </p>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Details</CardTitle>
              <CardDescription>
                Your SEO performance for the current month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Content Strategy</h3>
                <p className="text-sm text-gray-500">
                  This month we focused on creating high-quality content targeting your key service areas.
                  Two articles have been published and one is in the final review stage.
                </p>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Add a comment</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <h3 className="text-lg font-medium">Backlink Acquisition</h3>
                <p className="text-sm text-gray-500">
                  We've secured 4 high-quality backlinks from industry-relevant websites,
                  with 1 more in the final negotiation phase.
                </p>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <h3 className="text-lg font-medium">Technical Optimizations</h3>
                <p className="text-sm text-gray-500">
                  7 technical issues have been resolved, including image optimization, 
                  schema markup implementation, and mobile usability improvements.
                </p>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="previous-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Reports</CardTitle>
              <CardDescription>
                View your historical SEO performance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["April 2025", "March 2025", "February 2025", "January 2025", "December 2024"].map((month, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{month} Report</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft, Search, Award, Lightbulb, Edit3, PenTool } from "lucide-react";
import { useState } from "react";

export default function SeoToolPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">SEO Writing Tool</h2>
        <div className="flex items-center gap-2">
          <PenTool className="h-4 w-4 text-seoptimizer-primary" />
          <span className="text-sm text-gray-500">
            Create SEO-optimized content
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Content</CardTitle>
          <CardDescription>
            Follow the step-by-step process to create SEO-optimized content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="step1" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step1" className="flex items-center justify-center gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Keywords</span>
              </TabsTrigger>
              <TabsTrigger value="step2" className="flex items-center justify-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Structure</span>
              </TabsTrigger>
              <TabsTrigger value="step3" className="flex items-center justify-center gap-2">
                <AlignLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="step4" className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Step 1: Keyword Selection */}
            <TabsContent value="step1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Keyword Research</h3>
                  <p className="text-sm text-gray-500">
                    Enter your primary keyword and any secondary keywords to analyze search intention and semantic entities.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="primary-keyword" className="text-sm font-medium">
                      Primary Keyword
                    </label>
                    <Input
                      id="primary-keyword"
                      placeholder="e.g., SEO content writing services"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="secondary-keywords" className="text-sm font-medium">
                      Secondary Keywords (comma separated)
                    </label>
                    <Input
                      id="secondary-keywords"
                      placeholder="e.g., SEO writing, content optimization, SEO article writing"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Language
                    </label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="bg-seoptimizer-primary/10">
                        English
                      </Button>
                      <Button variant="outline">
                        French
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button className="bg-seoptimizer-primary hover:bg-seoptimizer-secondary">
                    Analyze Keywords & Continue
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 2: Content Structure */}
            <TabsContent value="step2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Content Structure</h3>
                  <p className="text-sm text-gray-500">
                    Edit the auto-generated content structure below. You can add, remove, or rearrange sections.
                  </p>
                </div>
                
                <div className="rounded-md border border-gray-200 p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-base font-medium">Generated Structure Preview</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Edit3 className="mr-2 h-4 w-4 text-seoptimizer-primary" />
                            <h5 className="font-bold">Introduction to SEO Content Writing Services</h5>
                          </div>
                          <p className="pl-6 text-sm text-gray-500">
                            Brief introduction explaining what SEO content writing entails and its importance.
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Edit3 className="mr-2 h-4 w-4 text-seoptimizer-primary" />
                            <h5 className="font-bold">Why Quality SEO Content Matters</h5>
                          </div>
                          <p className="pl-6 text-sm text-gray-500">
                            Explain the benefits of well-optimized content for search engines and users.
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Edit3 className="mr-2 h-4 w-4 text-seoptimizer-primary" />
                            <h5 className="font-bold">Our SEO Content Writing Process</h5>
                          </div>
                          <p className="pl-6 text-sm text-gray-500">
                            Outline the step-by-step process of creating SEO-friendly content.
                          </p>
                          <ul className="ml-10 list-disc space-y-1 text-sm text-gray-500">
                            <li>Keyword research and analysis</li>
                            <li>Competitor content evaluation</li>
                            <li>Content structure development</li>
                            <li>Writing and optimization</li>
                            <li>Quality assurance and publishing</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Edit3 className="mr-2 h-4 w-4 text-seoptimizer-primary" />
                            <h5 className="font-bold">Types of SEO Content We Create</h5>
                          </div>
                          <p className="pl-6 text-sm text-gray-500">
                            Describe different content formats available.
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Edit3 className="mr-2 h-4 w-4 text-seoptimizer-primary" />
                            <h5 className="font-bold">Conclusion</h5>
                          </div>
                          <p className="pl-6 text-sm text-gray-500">
                            Summary of key points and call to action.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Back to Keywords
                  </Button>
                  <Button className="bg-seoptimizer-primary hover:bg-seoptimizer-secondary">
                    Generate Content
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 3: Content Generation */}
            <TabsContent value="step3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Content Generation</h3>
                  <p className="text-sm text-gray-500">
                    Review and edit the generated content for each section.
                  </p>
                </div>
                
                <div className="rounded-md border border-gray-200 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium">Introduction to SEO Content Writing Services</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Regenerate</Button>
                        <Button variant="outline" size="sm">Edit with AI</Button>
                      </div>
                    </div>
                    
                    <Textarea
                      className="min-h-32"
                      defaultValue="In today's digital landscape, SEO content writing services have become essential for businesses looking to establish and expand their online presence. SEO content writing involves creating high-quality, valuable content that is strategically optimized for search engines while providing meaningful information to your target audience. This specialized form of content creation combines creative writing skills with technical SEO knowledge to produce articles, blog posts, and website copy that rank well in search engine results pages (SERPs) and drive organic traffic to your website."
                    />
                    
                    <div className="flex items-center justify-between pt-4">
                      <h4 className="text-base font-medium">Why Quality SEO Content Matters</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Regenerate</Button>
                        <Button variant="outline" size="sm">Edit with AI</Button>
                      </div>
                    </div>
                    
                    <Textarea
                      className="min-h-32"
                      defaultValue="Quality SEO content serves as the foundation of your digital marketing strategy. When properly executed, SEO-optimized content can significantly impact your online visibility and business success in several ways. First, it improves your website's ranking in search engine results, making it more likely for potential customers to find you. Second, well-crafted content establishes your brand as an authority in your industry, building trust with your audience. Additionally, valuable content encourages visitors to spend more time on your site, reducing bounce rates and increasing the likelihood of conversion."
                    />
                    
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <PenTool className="h-4 w-4" />
                      <span>2 of 5 sections generated</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Back to Structure
                  </Button>
                  <Button 
                    className="bg-seoptimizer-primary hover:bg-seoptimizer-secondary"
                    disabled
                  >
                    Analyze Content
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 4: Semantic Analysis */}
            <TabsContent value="step4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Semantic Analysis</h3>
                  <p className="text-sm text-gray-500">
                    Review the SEO score and metrics for your generated content.
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">SEO Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="relative h-32 w-32">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-seoptimizer-primary">92</span>
                          </div>
                          <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#f3f4f6"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#E94E19"
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset="23"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Excellent Score</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">DSEO Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Keyword Density</span>
                          <span className="text-sm text-green-600">Optimal</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">N-Gram Analysis</span>
                          <span className="text-sm text-green-600">Good</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Entity Coverage</span>
                          <span className="text-sm text-yellow-600">Moderate</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Semantic Depth</span>
                          <span className="text-sm text-green-600">Excellent</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Benchmark</CardTitle>
                    <CardDescription>
                      How your content compares to the top 5 competitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Word Count</span>
                          <span className="text-sm font-medium">1,450 words</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "85%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Competitors avg: 1,250 words</span>
                          <span>Your content: 1,450 words</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Keyword Coverage</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "92%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Competitors avg: 78%</span>
                          <span>Your content: 92%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Semantic Relevance</span>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-seoptimizer-primary" style={{ width: "88%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Competitors avg: 83%</span>
                          <span>Your content: 88%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    Back to Content
                  </Button>
                  <Button className="bg-seoptimizer-primary hover:bg-seoptimizer-secondary">
                    Save & Download
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 
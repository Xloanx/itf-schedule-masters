'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Layout/navbar";
import Footer from "@/components/Layout/footer";
import { 
  Upload, 
  Database, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  MessageSquare,
  Brain,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const AdminPortal = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const stats = [
    {
      title: "Total Documents",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Conversations",
      value: "89",
      change: "+5%",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "Knowledge Base Size",
      value: "2.3 GB",
      change: "+8%",
      icon: Database,
      color: "text-purple-600"
    },
    {
      title: "Accuracy Rate",
      value: "98.5%",
      change: "+0.2%",
      icon: Brain,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    { action: "Document uploaded: SIWES Guidelines 2024", time: "2 minutes ago", status: "success" },
    { action: "Knowledge base updated for TNA procedures", time: "15 minutes ago", status: "success" },
    { action: "User query processed: MSME training requirements", time: "32 minutes ago", status: "info" },
    { action: "System backup completed", time: "1 hour ago", status: "success" },
    { action: "Failed to process: Corrupted PDF file", time: "2 hours ago", status: "error" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage knowledge bases, monitor performance, and configure AI Schedule Masters
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`w-12 h-12 ${stat.color} opacity-20`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="knowledge" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Knowledge Base Management */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Upload Section */}
              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, DOC, TXT files up to 10MB
                    </p>
                    <Input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Select Files
                      </Button>
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} />
                          <p className="text-sm text-muted-foreground text-center">
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={simulateUpload} disabled={isUploading} className="w-full">
                          Upload & Process
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedFile(null)} className="w-full">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Knowledge Base Status */}
              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Knowledge Base Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "SIWES Documentation", docs: 234, status: "active" },
                    { name: "PPIT Procedures", docs: 189, status: "active" },
                    { name: "TNA Guidelines", docs: 156, status: "updating" },
                    { name: "Curriculum Standards", docs: 203, status: "active" },
                    { name: "MSME Resources", docs: 145, status: "active" }
                  ].map((kb, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{kb.name}</p>
                        <p className="text-sm text-muted-foreground">{kb.docs} documents</p>
                      </div>
                      <Badge variant={kb.status === 'active' ? 'default' : 'secondary'}>
                        {kb.status}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    Manage All Knowledge Bases
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Usage Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Analytics visualization would be implemented here</p>
                      <p className="text-sm">Integration with chart libraries needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle>Popular Queries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { query: "SIWES application process", count: 45 },
                    { query: "PPIT training requirements", count: 38 },
                    { query: "TNA procedure timeline", count: 32 },
                    { query: "MSME eligibility criteria", count: 29 },
                    { query: "Safety training guidelines", count: 24 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <p className="text-sm text-foreground">{item.query}</p>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Log */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                        {activity.status === 'info' && <AlertCircle className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>AI Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Response Temperature</label>
                    <Input type="number" placeholder="0.7" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Max Response Length</label>
                    <Input type="number" placeholder="500" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">System Prompt</label>
                    <Textarea 
                      placeholder="You are an expert ITF Schedule Master..." 
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { component: "Vector Database", status: "Healthy", uptime: "99.9%" },
                    { component: "AI Model", status: "Healthy", uptime: "99.8%" },
                    { component: "Chat Service", status: "Healthy", uptime: "100%" },
                    { component: "File Processing", status: "Warning", uptime: "98.2%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{item.component}</p>
                        <p className="text-sm text-muted-foreground">Uptime: {item.uptime}</p>
                      </div>
                      <Badge variant={item.status === 'Healthy' ? 'default' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;
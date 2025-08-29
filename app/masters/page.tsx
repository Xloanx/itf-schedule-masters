'use client'

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Navbar from "@/components/Layout/navbar";
import Footer from "@/components/Layout/footer";
import { schedules } from "@/data/schedules";
import { AuthButtons } from "@/components/auth/authButtons";
import { Search, MessageCircle, ArrowRight, AlertTriangle } from "lucide-react";

const ScheduleMasters = () => {
  const { isSignedIn, user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

  const handleStartConversation = (scheduleId: string) => {
    if (isSignedIn) {
      // User is logged in, proceed directly to chat
      window.location.href = `/chat/${scheduleId}`;
    } else {
      // Show warning for guest users
      setSelectedScheduleId(scheduleId);
      setShowGuestWarning(true);
    }
  };

  const filteredSchedules = schedules.filter(schedule =>
    schedule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-red-50 to-white">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your 
            <span className="bg-red-800 bg-clip-text text-transparent"> Schedule Master</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Select an AI expert specialized in ITF procedures and schedules. 
            Each Schedule Master is trained with comprehensive knowledge and Standard Operating Procedures.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search schedule masters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Schedule Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchedules.map((schedule) => {
            const Icon = schedule.icon;
            return (
              <Card 
                key={schedule.id} 
                className="hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${schedule.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="ml-2 flex-shrink-0">
                      {schedule.acronym}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {schedule.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {schedule.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {schedule.expertise.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {schedule.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{schedule.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* <Button asChild className="w-full group-hover:bg-primary/90" size="lg">
                    <Link href={`/chat/${schedule.id}`}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Conversation
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button> */}
                  <Button 
                    onClick={() => handleStartConversation(schedule.id)}
                    className="w-full group-hover:bg-primary/90" 
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Conversation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSchedules.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Schedule Masters Found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all available masters.
            </p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">{schedules.length}</div>
            <div className="text-muted-foreground">Schedule Masters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-muted-foreground">Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">100%</div>
            <div className="text-muted-foreground">Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground">Conversations</div>
          </div>
        </div>
      </div>
      
      {/* Guest Warning Dialog */}
      <AlertDialog open={showGuestWarning} onOpenChange={setShowGuestWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Continue as Guest?
            </AlertDialogTitle>

            {/* Wrap description text only in AlertDialogDescription */}
            <AlertDialogDescription>
              You're about to start a conversation as a guest user. Please note the following limitations:
            </AlertDialogDescription>

            {/* Use a separate div for the list */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chat history will not be saved</li>
                <li>No access to previous conversations</li>
                <li>Limited personalization features</li>
                <li>No conversation sharing capabilities</li>
              </ul>
              <p className="mt-3 font-medium">
                For the best experience, consider logging in first.
              </p>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end sm:items-center">
            <AlertDialogCancel className="sm:w-auto">Cancel</AlertDialogCancel>
            
            {/* Auth Buttons (Login + Sign Up) */}
            <div className="flex gap-2">
              <AuthButtons variant="outline" size="default" showUserButton={false} />
            </div>

            {/* Continue as Guest */}
            <AlertDialogAction asChild>
              <Link
                href={`/chat/${selectedScheduleId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Continue as Guest
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <Footer />
    </div>
  );
};

export default ScheduleMasters;
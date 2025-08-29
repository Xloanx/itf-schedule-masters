'use client'

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { AuthButtons } from "@/components/auth/authButtons";
import { useCompletion } from "@ai-sdk/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Navbar from "@/components/Layout/navbar";
import { getScheduleById } from "@/data/schedules";
import { 
  Send, 
  Mic, 
  Image, 
  FileText, 
  History, 
  ChevronDown, 
  ChevronUp,
  ArrowLeft,
  Bot,
  User,
  Clock,
  Square,
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: { type: string; name: string }[];
}

const ChatInterface = () => {
  const { isSignedIn, user } = useUser();
  const params = useParams();
  const scheduleId = params?.scheduleId as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const schedule = scheduleId ? getScheduleById(scheduleId) : null;

  const { 
    input, 
    handleInputChange, 
    completion, 
    isLoading, 
    error,
    stop,
    setInput,
  } = useCompletion({
    api: `/api/completion/${scheduleId}`,
    onResponse: (response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
    },
    onFinish: () => {
      // Add the completed message to the messages array
      if (completion) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: completion,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  useEffect(() => {
    // Load chat history from localStorage only for signed-in users
    if (isSignedIn) {
      const savedMessages = localStorage.getItem(`chat-${scheduleId}-${user?.id}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
        return;
      }
    }
    
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hello${isSignedIn ? ` ${user?.firstName}` : ''}! I'm your ${schedule?.name} Schedule Master. I'm here to help you with all aspects of ${schedule?.acronym}, including procedures, guidelines, and best practices. ${!isSignedIn ? 'Note: As a guest user, your chat history will not be saved. Consider logging in for a better experience.' : ''} How can I assist you today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [scheduleId, schedule, isSignedIn, user]);

  useEffect(() => {
   // Save messages to localStorage only for signed-in users
    if (isSignedIn && messages.length > 0) {
      localStorage.setItem(`chat-${scheduleId}-${user?.id}`, JSON.stringify(messages));
    }
  }, [messages, scheduleId,isSignedIn, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, completion, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Create a custom event to trigger the completion
    const event = {
      preventDefault: () => {},
      // We need to include the messages in the request body
    } as React.FormEvent<HTMLFormElement>;
    
    // Manually call the completion API
    fetch(`/api/completion/${scheduleId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      // Handle the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      
      if (reader) {
        const readChunk = () => {
          reader.read().then(({ value, done }) => {
            if (done) {
              // When done, add the completed message
              if (accumulatedText) {
                const aiMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  type: 'ai',
                  content: accumulatedText,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
              }
              return;
            }
            
            // Decode and process the chunk
            const chunk = decoder.decode(value, { stream: true });
            accumulatedText += chunk;
            
            // Continue reading
            readChunk();
          }).catch(error => {
            console.error('Error reading stream:', error);
          });
        };
        
        readChunk();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  if (!schedule) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Schedule Master Not Found</h1>
            <Button asChild>
              <Link href="/masters">Back to Schedule Masters</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const Icon = schedule.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: 'calc(100vh - 120px)' }}>
          
          {/* Schedule Info Panel */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <Card className="bg-gradient-card border-0 flex-shrink-0">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${schedule.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{schedule.acronym}</CardTitle>
                    <Badge variant="secondary">{schedule.name}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Objective</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {schedule.objective}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Expertise</h4>
                  <div className="space-y-2">
                    {schedule.expertise.map((skill: string, index: number) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat History Panel - Only for signed-in users */}
            {isSignedIn ? (
              <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-soft transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <History className="w-5 h-5 text-primary" />
                          <CardTitle className="text-lg">Chat History</CardTitle>
                        </div>
                        {isHistoryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <Card className="mt-2">
                    <CardContent className="p-4">
                      <ScrollArea className="h-32">
                        {messages.length > 0 ? (
                          <div className="space-y-2">
                            {messages.slice(-5).map((msg) => (
                              <div key={msg.id} className="text-sm">
                                <div className="flex items-center space-x-2 mb-1">
                                  {msg.type === 'ai' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                  <span className="font-medium">{msg.type === 'ai' ? 'AI' : 'You'}</span>
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {msg.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <p className="text-muted-foreground truncate">
                                  {msg.content.substring(0, 50)}...
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">No chat history yet</p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="p-4 text-center">
                  <History className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium text-foreground mb-2">Chat History</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign in to save and access your chat history across sessions.
                  </p>
                  <AuthButtons size="sm" showUserButton={false} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/masters">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold text-foreground">
                  Chat with {schedule.acronym} Master
                </h1>
              </div>
            </div>

            {/* Messages Area - Fixed height with scroll */}
            <Card className="flex-1 flex flex-col border-0 bg-gradient-card min-h-0">
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                <ScrollArea className="flex-1 p-6" ref={messagesContainerRef}>
                  <div className="space-y-4">
                    {error && <div className="text-red-500 text-sm mb-4">{error.message}</div>}
                    
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-end space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.type === 'user' ? 'bg-primary' : 'bg-secondary'
                            }`}>
                              {msg.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className={`rounded-2xl px-4 py-3 ${
                              msg.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-foreground'
                            }`}>
                              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                              <p className="text-xs opacity-70 mt-2">
                                {msg.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-end space-x-2">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-muted rounded-2xl px-4 py-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area - Fixed height */}
                <div className="border-t p-4 flex-shrink-0">
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Textarea
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyPress}
                          placeholder={`Ask me anything about ${schedule.acronym}...`}
                          className="min-h-12 max-h-32 resize-none"
                          rows={1}
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button type="button" disabled={!input.trim() || isLoading} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <Mic className="w-5 h-5" />
                        </Button>
                        <Button type="button" disabled={!input.trim() || isLoading} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <Image className="w-5 h-5" />
                        </Button>
                        <Button 
                          type="button" 
                          disabled={!input.trim() || isLoading} 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-primary">
                          <FileText className="w-5 h-5" />
                        </Button>
                        <Button 
                          type="submit"
                          disabled={!input.trim() || isLoading}
                          className="px-6"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
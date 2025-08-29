import Link from "next/link";
import { AuthButtons } from "@/components/auth/authButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Layout/navbar";
import Footer from "@/components/Layout/footer";
import heroImage from "@/public/hero-image.jpg";
import { 
  MessageCircle, 
  Brain, 
  Users, 
  FileText, 
  Mic, 
  Image, 
  Video,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Schedule Masters",
      description: "Engage with specialized AI characters trained on ITF Standard Operating Procedures"
    },
    {
      icon: MessageCircle,
      title: "Multi-Modal Conversations",
      description: "Communicate through text, voice, images, videos, and file uploads"
    },
    {
      icon: FileText,
      title: "RAG-Enabled Knowledge Base",
      description: "Access comprehensive, up-to-date information from ITF documentation"
    },
    {
      icon: Users,
      title: "Persistent Chat History",
      description: "Your conversations are saved and accessible across all sessions"
    }
  ];

  const benefits = [
    "Expert guidance on 11 specialized ITF schedules",
    "24/7 availability for instant support",
    "Consistent, accurate information delivery",
    "Seamless integration with ITF procedures",
    "Advanced conversation memory",
    "Multi-format content support"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-800 to-red-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 animate-fade-in-up">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Advanced AI Technology
              </Badge>
              
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img 
                  src="/ITF_Logo_2.png" 
                  alt="ITF Logo" 
                  className="h-16 w-16 object-contain mr-4 animate-pulse-glow"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    ITF Connect
                  </h1>
                  <p className="text-lg text-cyan-200 font-medium italic">
                    ...Developing the Nation's Human Resource
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 animate-fade-in-up">
                Connect with
                <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                  AI Schedule Masters
                </span>
              </h2>
              
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed animate-fade-in-up">
                Experience meaningful conversations with specialized AI characters trained on 
                Industrial Training Fund procedures. Get expert guidance on SIWES, PPIT, TNA, 
                and 8 other ITF schedules.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button asChild variant="accent" size="lg" className="text-lg px-8">
                  <Link href="/masters">
                    Start Chatting
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <AuthButtons 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 border-white/20 text-white hover:bg-white/10"
                  showUserButton={false}
                />
                <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  <Link href="/admin">
                    Admin Portal
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="relative rounded-2xl overflow-hidden shadow-glow">
                <img 
                  // src={heroImage}
                  src="hero-bg.jpg"
                  alt="ITF Connect AI Platform" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Seamless Interaction
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with ITF expertise to deliver 
              an unprecedented conversation experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card">
                  <CardContent className="pt-8 pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-xl mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Use ITF Connect AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform how you access ITF information and procedures with our intelligent, 
                always-available AI schedule masters.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-red-900 text-white hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Text Chat</h3>
                  <p className="text-cyan-100 text-sm">Natural conversations</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary text-white hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mic className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Voice</h3>
                  <p className="text-teal-100 text-sm">Speak naturally</p>
                </CardContent>
              </Card>
              
              <Card className="bg-accent text-white hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Image className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Images</h3>
                  <p className="text-orange-100 text-sm">Visual communication</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-500 text-white hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Video</h3>
                  <p className="text-purple-100 text-sm">Rich media support</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-red-950 ">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Conversation?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
            Join thousands of users who are already experiencing the future of 
            ITF knowledge access and procedure guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="lg" className="text-lg px-8">
              <Link href="/masters">
                Choose a Schedule Master
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <AuthButtons 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 border-white/20 text-white hover:bg-white/10"
              showUserButton={false}
            />
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
              <Link href="/admin">
                Administrator Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
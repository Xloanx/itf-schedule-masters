import Link from "next/link";
import { Users, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="/ITF_Logo_2.png" 
                alt="ITF Logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">ITF Connect</span>
                <span className="text-xs text-muted-foreground italic">...Developing the Nation's Human Resource</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Empowering meaningful conversations with AI-driven schedule masters. 
              Access expert guidance on ITF procedures and processes anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/masters" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Schedule Masters
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@itf.gov.ng</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+234 (0) 9 461 6820</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Miango Road, Jos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            
            © {new Date().getFullYear()} Industrial Training Fund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
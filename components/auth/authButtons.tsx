import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'

interface AuthButtonsProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showUserButton?: boolean
}

export const AuthButtons = ({ 
  variant = 'outline', 
  size = 'lg', 
  className = '',
  showUserButton = true 
}: AuthButtonsProps) => {
  return (
    <>
      <SignedOut>
        <div className={`flex gap-2 ${className}`}>
          <SignInButton fallbackRedirectUrl="/masters">
            <Button variant={variant} size={size}>
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </SignInButton>
          <SignUpButton fallbackRedirectUrl="/masters">
            <Button variant={variant} size={size}>
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        {showUserButton && <UserButton />}
      </SignedIn>
    </>
  )
}
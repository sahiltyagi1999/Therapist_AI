import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Heart } from 'lucide-react';

interface NavigationProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navigation = ({ onLoginClick, onSignupClick }: NavigationProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-blue-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-therapeutic">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Therapist AI
              </span>
              <p className="text-sm text-gray-500 -mt-1">Mental Wellness Companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onLoginClick}
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-gray-600 rounded-xl px-6 py-2"
            >
              Sign In
            </Button>
            <Button 
              onClick={onSignupClick}
              className="therapeutic-button rounded-xl px-6 py-2 shadow-therapeutic"
            >
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
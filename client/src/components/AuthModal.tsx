import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Heart, Shield, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onAuthenticated: (token: string) => void;
}

const BASE_URL = `${import.meta.env.VITE_URL}/api/auth`;

const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onAuthenticated }: AuthModalProps) => {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = tab === 'signup' ? `${BASE_URL}/register` : `${BASE_URL}/login`;
      const body =
        tab === 'signup'
          ? { email, password, fullName: name }
          : { email, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      if (tab === 'login') {
        const { token, userId } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        onAuthenticated(token);
        onClose();
      } else {
        alert(data.msg); 
        setTab('login');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-0 shadow-therapeutic-lg">
        <DialogHeader className="text-center pb-6">
          <div className="mx-auto mb-4 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center shadow-therapeutic mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Welcome to Therapist AI
          </DialogTitle>
          <p className="text-gray-600 mt-2">Your safe space for mental wellness and support</p>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full" onValueChange={(val) => setTab(val as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 bg-blue-50 rounded-2xl p-1">
            <TabsTrigger 
              value="login" 
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
            >
              Join Us
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-6 mt-6">
            <div className="text-center mb-4">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Secure access to your therapeutic space</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-blue-200 focus:border-blue-400 bg-white/90"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-blue-200 focus:border-blue-400 bg-white/90"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full h-12 therapeutic-button rounded-2xl text-lg font-medium shadow-therapeutic" 
                disabled={loading}
              >
                {loading ? 'Signing you in...' : 'Access My Space'}
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="space-y-6 mt-6">
            <div className="text-center mb-4">
              <UserPlus className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Begin your journey to better mental health</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="How would you like to be addressed?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-green-200 focus:border-green-400 bg-white/90"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-green-200 focus:border-green-400 bg-white/90"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-700 font-medium">Create Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Choose a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-green-200 focus:border-green-400 bg-white/90"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl text-lg font-medium shadow-therapeutic transition-all duration-300 transform hover:scale-105" 
                disabled={loading}
              >
                {loading ? 'Creating your space...' : 'Start My Journey'}
              </Button>
            </form>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-600 text-center">
                By joining, you're taking an important step towards better mental health. 
                Your privacy and wellbeing are our top priorities.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

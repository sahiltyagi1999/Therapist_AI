
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, Shield, Users, MessageCircle, Zap, Lock, Clock } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const LandingPage = ({ onLoginClick, onSignupClick }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-green-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-gentle-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center shadow-therapeutic-lg animate-gentle-bounce">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full border-3 border-white flex items-center justify-center animate-soft-pulse">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Therapist AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Your compassionate AI companion for mental wellness and emotional support
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Professional therapy support, available 24/7. Because mental health shouldn't wait, 
              and everyone deserves access to care without judgment or barriers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={onSignupClick}
                className="therapeutic-button text-xl px-12 py-6 rounded-2xl shadow-therapeutic-lg"
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onLoginClick}
                className="border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 text-blue-600 transition-all duration-300 text-xl px-12 py-6 rounded-2xl shadow-lg"
              >
                Welcome Back
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Why Choose Therapist AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade therapeutic support designed with compassion, privacy, and accessibility in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="therapeutic-card therapeutic-hover group border-0 overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-therapeutic">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Safe Conversations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Non-judgmental, empathetic responses designed to create a safe therapeutic environment
                </p>
              </CardContent>
            </Card>

            <Card className="therapeutic-card therapeutic-hover group border-0 overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-therapeutic">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">24/7 Availability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mental health support whenever you need it, day or night, without appointments
                </p>
              </CardContent>
            </Card>

            <Card className="therapeutic-card therapeutic-hover group border-0 overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-therapeutic">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Complete Privacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your conversations are confidential and secure, providing a truly private therapeutic space
                </p>
              </CardContent>
            </Card>

            <Card className="therapeutic-card therapeutic-hover group border-0 overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-therapeutic">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Compassionate Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  Empathetic responses that validate your feelings and provide genuine emotional support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 rounded-3xl p-12 backdrop-blur-sm border border-blue-200/50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Mental Health Support That Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed for those who need accessible, judgment-free therapeutic support
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">No Shame, No Judgment</h3>
                    <p className="text-gray-600">Talk freely about your feelings without fear of being judged or misunderstood.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Immediate Support</h3>
                    <p className="text-gray-600">Get help when you need it most, without waiting for appointments or approvals.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Affordable Care</h3>
                    <p className="text-gray-600">Quality mental health support that doesn't break the bank or require insurance.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 rounded-2xl p-8 shadow-therapeutic">
                <blockquote className="text-lg text-gray-600 italic mb-4">
                  "Mental health is not a luxury - it's a necessity. Everyone deserves access to compassionate, 
                  professional support when they need it most."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Therapist AI Team</p>
                    <p className="text-gray-500 text-sm">Mental Health Advocates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="therapeutic-card rounded-3xl p-16 backdrop-blur-sm border-0 shadow-therapeutic-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Ready to Prioritize Your Mental Health?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Take the first step towards better mental wellness. Your journey to emotional wellbeing starts here.
            </p>
            <Button 
              size="lg" 
              onClick={onSignupClick}
              className="therapeutic-button text-2xl px-16 py-8 rounded-2xl shadow-therapeutic-lg transform hover:scale-105"
            >
              Begin Your Healing Today
            </Button>
            <p className="text-sm text-gray-500 mt-6">
              Free to start • No commitment required • Your privacy protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

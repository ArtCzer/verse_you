import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { FilledTextField } from './FilledTextField';
import { useNavigation } from '../contexts/NavigationContext';
import { signIn } from '../services/authService';

export function SignInPage() {
  const { navigateToSignUp } = useNavigation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await signIn({
        email: formData.email,
        password: formData.password,
      });

      console.log('Sign in successful:', data);
      // Handle successful sign in (e.g., redirect or store token)
    } catch (error: any) {
      console.error('Sign in error:', error);
      setErrors({ apiError: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    // Handle Google OAuth integration here
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign in clicked');
    // Handle Facebook OAuth integration here
  };

  return (
    <div className="min-h-screen md-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-normal text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-lg text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Main Form Card */}
        <Card className="w-full md-surface-container md-elevation-2 border-0 rounded-3xl overflow-hidden">
          <CardHeader className="space-y-2 pb-4 px-6 pt-8">
            <CardTitle className="text-2xl text-center font-normal">Sign In</CardTitle>
            <CardDescription className="text-center text-base text-muted-foreground">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-6 pb-8">
            {/* Social Sign In Buttons */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 bg-surface-container border-outline-variant hover:bg-surface-container-high hover:border-outline transition-all duration-200 rounded-full"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFacebookSignIn}
                  className="w-full h-12 bg-surface-container border-outline-variant hover:bg-surface-container-high hover:border-outline transition-all duration-200 rounded-full"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Continue with Facebook</span>
                  </div>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-4 text-sm text-muted-foreground">Or continue with email</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <FilledTextField
                id="email"
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(value: string) => handleInputChange('email', value)}
                error={errors.email}
                icon={Mail}
                isFocused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
              />

              {/* Password Field */}
              <FilledTextField
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value: string) => handleInputChange('password', value)}
                error={errors.password}
                icon={Lock}
                endIcon={showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                onEndIconClick={() => setShowPassword(!showPassword)}
                isFocused={focusedField === 'password'}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end px-2">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline font-medium transition-colors md-state-layer-hover rounded px-2 py-1"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 md-elevation-1 hover:md-elevation-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-base text-muted-foreground">
            Don't have an account?{' '}
            <button 
              onClick={navigateToSignUp}
              className="text-primary hover:underline font-medium transition-colors md-state-layer-hover rounded px-1 py-0.5"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center px-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            Your data is protected with industry-standard security measures.
          </p>
        </div>
      </div>
    </div>
  );
}
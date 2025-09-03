import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import apiConfig from '../config/apiConfig.json';
import { signUp } from '../services/authService';
import { FilledTextField } from './FilledTextField';
import { useNavigation } from '../contexts/NavigationContext';

export function SignUpPage() {
  const { navigateToSignIn } = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      const data = await signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.log('Sign up successful:', data);
      // Handle successful sign up (e.g., redirect or show success message)
    } catch (error: any) {
      console.error('Sign up error:', error);
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

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Handle Google OAuth integration here
    // In a real app, you would integrate with Google OAuth
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up clicked');
    // Handle Facebook OAuth integration here
    // In a real app, you would integrate with Facebook Login
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: 'bg-muted' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-destructive' };
    if (password.length < 10) return { strength: 2, label: 'Fair', color: 'bg-yellow-600' };
    if (password.length >= 10 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, label: 'Strong', color: 'bg-green-600' };
    }
    return { strength: 2, label: 'Fair', color: 'bg-yellow-600' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen md-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-normal text-foreground tracking-tight">Create Account</h1>
          <p className="text-lg text-muted-foreground">Join us today and get started</p>
        </div>

        {/* Main Form Card */}
        <Card className="w-full md-surface-container md-elevation-2 border-0 rounded-3xl overflow-hidden">
          <CardHeader className="space-y-2 pb-4 px-6 pt-8">
            <CardTitle className="text-2xl text-center font-normal">Sign Up</CardTitle>
            <CardDescription className="text-center text-base text-muted-foreground">
              Choose your preferred sign up method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-6 pb-8">
            {/* Social Sign Up Buttons */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
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
                  onClick={handleFacebookSignUp}
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
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <FilledTextField
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange('firstName', value)}
                  error={errors.firstName}
                  icon={User}
                  isFocused={focusedField === 'firstName'}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField('')}
                />

                <FilledTextField
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  error={errors.lastName}
                  icon={User}
                  isFocused={focusedField === 'lastName'}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField('')}
                />
              </div>

              {/* Email Field */}
              <FilledTextField
                id="email"
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                icon={Mail}
                isFocused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
              />

              {/* Password Field */}
              <div className="space-y-1">
                <FilledTextField
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  error={errors.password}
                  icon={Lock}
                  endIcon={showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  onEndIconClick={() => setShowPassword(!showPassword)}
                  isFocused={focusedField === 'password'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                />
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1 px-4 pt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            passwordStrength.strength >= level
                              ? passwordStrength.color
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <FilledTextField
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                error={errors.confirmPassword}
                icon={Lock}
                endIcon={showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                isFocused={focusedField === 'confirmPassword'}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField('')}
              />

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 px-2 pt-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: boolean) => handleInputChange('acceptTerms', !!checked)}
                  className="mt-1 w-5 h-5"
                />
                <div className="space-y-1">
                  <Label htmlFor="acceptTerms" className="text-sm font-normal leading-relaxed cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.acceptTerms && (
                    <p className="text-xs text-destructive">{errors.acceptTerms}</p>
                  )}
                </div>
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-base text-muted-foreground">
            Already have an account?{' '}
            <button 
              className="text-primary hover:underline font-medium transition-colors md-state-layer-hover rounded px-1 py-0.5"
              onClick={navigateToSignIn}
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center px-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            We use industry-standard security measures to protect your data.
          </p>
        </div>
      </div>
    </div>
  );
}
import apiConfig from '../config/apiConfig.json';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signUp(signUpData: SignUpData): Promise<any> {
  const response = await fetch(`${apiConfig.baseURL}/api/Auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign up failed');
  }

  return response.json();
}

export interface SignInData {
  email: string;
  password: string;
}

export async function signIn(signInData: SignInData): Promise<any> {
  const response = await fetch(`${apiConfig.baseURL}/api/Auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign in failed');
  }

  const data = await response.json();

  // Store the JWT in localStorage
  localStorage.setItem('jwt', data.Token);

  return data;
}

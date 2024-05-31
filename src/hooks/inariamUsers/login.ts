import { useState } from 'react';
import Cookies from 'js-cookie';

interface LoginResponse {
  username: string;
  email: string;
  gcp_project_name: string;
  azure_client_id: string;
  azure_client_secret: string;
  azure_tenant_id: string;
  ibm_api_key: string;
  token: string; // Add the token field
}

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await fetch('http://signin:9091/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }

      const userData: LoginResponse = await response.json();
      setUserData(userData);

      // Store the JWT token in an HTTP-only cookie
      Cookies.set('auth', userData.token, { expires: 1, sameSite: 'strict' });

      // Navigate the user to another page or set the user's data in a global state/context
      alert("Sign in successful");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return { email, password, setEmail, setPassword, login, userData, error };
};

export default useLogin;

// /hooks/useLogin.ts

import { useState } from 'react';

interface LoginResponse {
  username: string;
  email: string;
  gcp_project_name: string;
  azure_client_id: string;
  azure_client_secret: string;
  azure_tenant_id: string;
  ibm_api_key: string;
}

 const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await fetch('http://localhost:9091/signin', { // You might need to adjust the URL depending on your setup (e.g., 'http://localhost:8080/signin')
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      });
      alert("sign in successful");

      
      console.log(response)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }

      const userData: LoginResponse = await response.json();
      setUserData(userData);
      // Here you might want to navigate the user to another page or set the user's data in a global state/context
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        }
    }
  };

  return { email, password, setEmail, setPassword, login, userData, error };
};
export default useLogin;
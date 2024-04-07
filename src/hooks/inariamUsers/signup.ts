import { useState } from "react";

const useSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // GCP Fields
  const [projectId, setProjectId] = useState("");
  const [gcpJsonFile, setGcpJsonFile] = useState(null); // Handle as file
  // Azure Fields
  const [azureClientId, setAzureClientId] = useState("");
  const [azureClientSecret, setAzureClientSecret] = useState("");
  const [azureTenantId, setAzureTenantId] = useState("");
  // IBM Fields
  const [ibmApiKey, setIbmApiKey] = useState("");

  const signup = async () => {
    const formData = new FormData();

    // Append common fields
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);

    // GCP Fields
    formData.append("projectId", projectId);
    if (gcpJsonFile) {
      formData.append("gcpJsonFile", gcpJsonFile);
    }

    // Azure Fields
    formData.append("azureClientId", azureClientId);
    formData.append("azureClientSecret", azureClientSecret);
    formData.append("azureTenantId", azureTenantId);

    // IBM Fields
    formData.append("ibmApiKey", ibmApiKey);

    try {
      // Adjust the URL to your backend endpoint for signup
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData, // Use FormData to handle file uploads and text fields
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      // Handle successful signup
      alert("Signup successful!");
      // Redirect the user or clear the form as needed
    } catch (error) {
      alert(`Signup error: ${error}`);
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    username, setUsername,
    projectId, setProjectId,
    gcpJsonFile, setGcpJsonFile,
    azureClientId, setAzureClientId,
    azureClientSecret, setAzureClientSecret,
    azureTenantId, setAzureTenantId,
    ibmApiKey, setIbmApiKey,
    signup,
  };
};

export default useSignup

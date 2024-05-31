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
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    // GCP Fields
    
      formData.append("gcp_json", gcpJsonFile); // The key must match the backend's expected key
    
    
    formData.append("gcp_project_name", projectId);
    console.log(projectId)
    

    // Azure Fields
    formData.append("azure_client_id", azureClientId);
    formData.append("azure_client_secret", azureClientSecret);
    formData.append("azure_tenant_id", azureTenantId);
    console.log("passe ici")

    // IBM Fields
    formData.append("ibm_api_key", ibmApiKey);
    
   
      

 
      // Adjust the URL to your backend endpoint for signup
      try{ const response = await fetch('http://signup:8090/signup', {
        method: 'POST',
        
        body: formData,
      });
      alert("Signup successful!");
      return true
     // router.push('/');

    }
      catch(e) {
        console.log(e)
       
        alert(`Signup error: ${e}`);
        }
      }
     


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

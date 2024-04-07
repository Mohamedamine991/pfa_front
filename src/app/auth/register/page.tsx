"use client"
import { useState } from "react";
import Image from "next/image";
import svg from "./../../../../public/cloud.svg"; // Adjust the path as necessary
import { Input, Button, Textarea } from "@nextui-org/react";
import { useSignup } from "@/hooks"; // Adjust the path as necessary

const Signup = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    projectId,
    setProjectId,
    setGcpJsonFile,
    azureClientId,
    setAzureClientId,
    azureClientSecret,
    setAzureClientSecret,
    azureTenantId,
    setAzureTenantId,
    ibmApiKey,
    setIbmApiKey,
    signup,
  } = useSignup();

  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    setSelectedFile(event.target.files[0]);
    setGcpJsonFile(event.target.files[0]);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <aside className="w-1/2 h-full bg-[#2B3E6C] hidden lg:flex flex-col justify-center">
        <div className="w-full p-5 flex flex-col items-center">
          <Image src={svg.src} objectFit="fill" width={200} height={200} alt="Cloud Services Logo" />
          <h1 className="text-white text-xl text-center my-5">
            Join Our Platform to Manage Cloud Instances Across Multiple Providers
          </h1>
          <Button className="text-white" size="md" variant="bordered">
            Learn More
          </Button>
        </div>
      </aside>

      <aside className="lg:w-1/2 w-full bg-auto h-full flex flex-col items-center justify-center px-5">
        
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-[#2B3E6C] text-center font-bold text-3xl">Sign Up</h1>

        <div className="lg:w-8/12 w-11/12 py-10 h-auto m-auto flex items-center justify-center gap-5 flex-col">
          <Input   placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input   type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input   placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input   placeholder="GCP Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
          <div>
            <label htmlFor="gcpJsonFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">GCP JSON File</label>
            <input id="gcpJsonFile" type="file" /*onChange={handleFileChange}*/ />
          </div>
          <Input   placeholder="Azure Client ID" value={azureClientId} onChange={(e) => setAzureClientId(e.target.value)} />
          <Input    placeholder="Azure Client Secret" value={azureClientSecret} onChange={(e) => setAzureClientSecret(e.target.value)} />
          <Input    placeholder="Azure Tenant ID" value={azureTenantId} onChange={(e) => setAzureTenantId(e.target.value)} />
          <Input  placeholder="IBM API Key" value={ibmApiKey} onChange={(e) => setIbmApiKey(e.target.value)} />
          <Button className="w-full mt-4" type="submit" color="primary">Sign Up</Button>
          </div>
        </form>
        
      </aside>
    </div>
  );
};

export default Signup;

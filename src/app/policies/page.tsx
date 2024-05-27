"use client";
import React, { useState, useEffect } from "react";
import { Title, ProviderButton } from "@/components/atoms";
import { PolicyData, IamModal } from "@/components/organisms";
import { AdminMenu, HandlePolicy } from "@/components/molecules";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useDebounce } from "@uidotdev/usehooks";

const PolicyPage = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchResources = async () => {
      // Fetching GCP instances and buckets
      const instanceResponse = await fetch('http://localhost:8086/instances');
      const bucketResponse = await fetch('http://localhost:8086/storage-buckets');
      // Fetching IBM resources
      const ibmResponse = await fetch('http://localhost:8082/resources');
      // Fetching Azure resources
      const azureResponse = await fetch('http://localhost:8081/resources');

      let newResources = [];

      if (instanceResponse.ok) {
        const instanceData = await instanceResponse.json();
        newResources = newResources.concat(instanceData.map(item => ({
          id: item.name,
          name: item.name,
          provider: item.provider,
          location: item.zone.split('/').pop(),
          type: 'VM'
        })));
      } else {
        console.error('Failed to fetch instances:', instanceResponse.statusText);
      }

      if (bucketResponse.ok) {
        const bucketData = await bucketResponse.json();
        newResources = newResources.concat(bucketData.map(bucket => ({
          id: bucket.Name,
          name: bucket.Name,
          provider: "Google Cloud",
          location: bucket.Location,
          type: 'Storage Bucket'
        })));
      } else {
        console.error('Failed to fetch buckets:', bucketResponse.statusText);
      }

      if (ibmResponse.ok) {
        const ibmData = await ibmResponse.json();
        newResources = newResources.concat(ibmData.map(res => ({
          id: res.id,
          name: res.name,
          provider: "IBM",
          location: res.region_id,
          type: res.type || 'IBM Resource'
        })));
        console.log("IBM resources:", ibmData)
      } else {
        console.error('Failed to fetch IBM resources:', ibmResponse.statusText);
      }

      if (azureResponse.ok) {
        const azureData = await azureResponse.json();
        newResources = newResources.concat(azureData.map(res => ({
          id: res.id,
          name: res.name,
          provider: "Azure",
          location: res.location,
          type: res.type
        })));
        console.log("Azure resources:", azureData)
      } else {
        console.error('Failed to fetch Azure resources:', azureResponse.statusText);
      }

      setResources(newResources);
    };

    fetchResources();
  }, []);

  const deleteIBMResource = async (resourceId) => {
    try {
      const response = await fetch('http://localhost:8085/deleteResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resourceId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      setResources(prevResources => prevResources.filter(res => res.id !== resourceId));
    } catch (error) {
      console.error('Failed to delete the IBM resource:', error);
      alert('Failed to delete the IBM resource.');
    }
  };

  const deleteGCPResource = async (resource) => {
    let endpoint = '';
    let payload = {};

    // Determine if the resource is a VM or a Bucket and set the appropriate URL and payload
    if (resource.type === 'VM') {
      endpoint = 'http://localhost:8083/deleteInstance';
      payload = {
        projectID: 'sound-habitat-418811', 
        zone: resource.location,
        instanceName: resource.name,
      };
    } else if (resource.type === 'Storage Bucket') {
      endpoint = 'http://localhost:8084/deleteBucket';
      payload = {
        bucketName: resource.name,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert(`${resource.type} "${resource.name}" deleted successfully!`);
      // Update the state to remove the resource from the list
      setResources(prevResources => prevResources.filter(res => res.id !== resource.id));
    } catch (error) {
      console.error('Failed to delete the resource:', error);
      alert(`Failed to delete ${resource.type} "${resource.name}".`);
    }
  };

  const deleteAzureResource = async (resource) => {
    if (resource.type !== 'Microsoft.Compute/virtualMachines') {
      alert(`Deletion for resource type "${resource.type}" is not supported yet.`);
      return;
    }

    const payload = {
      subscriptionId: 'your_subscription_id', // Replace with your Azure subscription ID
      resourceGroupName: 'your_resource_group_name', // Replace with the resource group name
      vmName: resource.name,
    };

    try {
      const response = await fetch('http://localhost:8080/deleteVM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert(`Azure VM "${resource.name}" deleted successfully!`);
      // Update the state to remove the resource from the list
      setResources(prevResources => prevResources.filter(res => res.id !== resource.id));
    } catch (error) {
      console.error('Failed to delete the Azure VM:', error);
      alert(`Failed to delete Azure VM "${resource.name}".`);
    }
  };

  const stopAzureVM = async (resource) => {
    if (resource.type !== 'Microsoft.Compute/virtualMachines') {
      alert(`Stopping for resource type "${resource.type}" is not supported yet.`);
      return;
    }

    const payload = {
      subscriptionId: 'your_subscription_id', // Replace with your Azure subscription ID
      resourceGroupName: 'your_resource_group_name', // Replace with the resource group name
      vmName: resource.name,
    };

    try {
      const response = await fetch('http://localhost:8095/stopVM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert(`Azure VM "${resource.name}" stopped successfully!`);
    } catch (error) {
      console.error('Failed to stop the Azure VM:', error);
      alert(`Failed to stop Azure VM "${resource.name}".`);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <section className="w-full h-auto darkGradient overflow-hidden">
        <AdminMenu Counter={300} />
      </section>

      <div className="flex items-center justify-center w-full h-full">
        <aside className="hidden xl:block w-1/4 h-full border-r border-gray-600">
          <Title>My Cloud Providers</Title>
          <div className="w-full h-auto flex items-center justify-center flex-col gap-5">
            <ProviderButton Active Provider="azure" Event={() => {}} />
            <ProviderButton Active Provider="gcp" Event={() => {}} />
            <ProviderButton Provider="aws" />
          </div>
        </aside>
        <aside className="w-full xl:w-3/4 h-full overflow-y-scroll pb-20">
          <Title>List Of Resources ({resources.length})</Title>

          <div className="w-4/5 m-auto h-auto flex items-center justify-between px-10 flex-col md:flex-row gap-5">
            <Input
              type="text"
              color="default"
              className="lg:w-96 !text-xs lg:text-base"
              placeholder="Search For A Resource"
              labelPlacement="outside"
              startContent={<AiOutlineSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button color="warning" className="text-white" type="button" onPress={onOpen}>
              Add A Resource
            </Button>
          </div>

          <div className="w-11/12 lg:w-4/5 m-auto h-auto px-10 py-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stop
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resources.map(resource => (
                  <tr key={resource.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resource.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resource.provider === 'Google Cloud' ? (
                        <Button color="error" size="sm" onClick={() => deleteGCPResource(resource)}>
                          Delete
                        </Button>
                      ) : resource.provider === 'IBM' ? (
                        <Button color="error" size="sm" onClick={() => deleteIBMResource(resource.id)}>
                          Delete
                        </Button>
                      ) : resource.provider === 'Azure' && resource.type === 'Microsoft.Compute/virtualMachines' ? (
                        <Button color="error" size="sm" onClick={() => deleteAzureResource(resource)}>
                          Delete
                        </Button>
                      ) : (
                        <Button color="error" size="sm" disabled>
                          Delete
                        </Button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resource.provider === 'Azure' && resource.type === 'Microsoft.Compute/virtualMachines' ? (
                        <Button color="primary" size="sm" onClick={() => stopAzureVM(resource)}>
                          Stop
                        </Button>
                      ) : (
                        <Button color="primary" size="sm" disabled>
                          Stop
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>

      <IamModal
        Size={"4xl"}
        isOpen={isOpen}
        onClose={onClose}
        handler={onOpen}
        body={<HandlePolicy onCreate={(r) => { setSaveRes(r); }} />}
        title={"Create Resource"}
      />
    </div>
  );
};

export default PolicyPage;

"use client";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';

const HandlePolicy = () => {
  const [provider, setProvider] = useState('');
  const [resource, setResource] = useState('');
  const [attributes, setAttributes] = useState({});

  const apiEndpoints = {
    azure: {
      blob: "http://localhost:8070/api/azure/create_blob_storage",
      sql: "http://localhost:8071/api/azure/create_sql_db",
      vm: "http://localhost:8074/api/azure/create_vm",
      storage_account: "http://localhost:8076/api/update-azure-storage"
    },
    gcp: {
      bucket: "http://localhost:8072/api/gcp/storage-bucket",
      sql: "http://localhost:8073/api/gcp/create_sql",
      vm: "http://localhost:8075/api/gcp/create_vm"
    },
    ibm: {
      vm: "http://localhost:8077/api/ibm/create_vm",
      object_storage: "http://localhost:8078/api/ibm/create_object_storage",
      datastage: "http://localhost:8079/api/ibm/create_datastage"
    }
  };

  const providerResources = {
    azure: {
      blob: ["container_name", "storage_account_name", "container_access_type"],
      sql: ["resource_group_name", "location", "sql_server_name", "sql_server_admin_login", "sql_server_admin_password",
            "sql_database_name", "sql_database_collation", "sql_database_max_size_gb", "sql_database_sku_name",
            "sql_database_sku_capacity", "sql_database_sku_tier", "sql_database_sku_family",
            "sql_database_zone_redundant", "sql_firewall_rules"],
      vm: ["resource_group_name", "location", "vm_name", "admin_username", "admin_password",
           "image_publisher", "image_offer", "image_sku", "image_version"],
      storage_account: ["resource_group_name", "location", "storage_account_name", "account_tier", "replication_type", "tags"]
    },
    gcp: {
      bucket: ["project_id", "bucket_name", "location", "storage_class", "versioning_enabled", "force_destroy", "logging"],
      sql: ["project_id", "region", "instance_name", "db_version", "tier", "storage_type", "storage_size",
            "availability_type", "maintenance_window_day", "maintenance_window_hour", "backup_start_time",
            "insights_config_query_insights_enabled"],
      vm: ["project_id", "region", "zone", "instance_name", "machine_type", "image_family", "image_project"]
    },
    ibm: {
      vm: ["resource_group_name", "location", "vm_name", "vm_size", "admin_username", "admin_password", "image_publisher", "image_offer", "image_sku", "image_version"],
      object_storage: ["api_key", "resource_group_id", "instance_name", "plan", "location", "tags", "enable_hmac"],
      datastage: ["instance_name", "plan", "location", "resource_group_id", "tags"]
    }
  };

  const handleAttributeChange = (key, value) => {
    setAttributes(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (provider === 'ibm') {
      alert("You need a paid plan to create this service.");
      return;
    }

    const endpoint = apiEndpoints[provider][resource];
    const data = attributes;

    try {
      console.log(endpoint);
      console.log(data);
      const response = await axios.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Resource created/updated successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating/updating resource:', error);
      alert('Failed to create/update resource.');
    }
  };

  return (
    <div className="w-2/3 flex items-center justify-center flex-col h-auto m-auto gap-5">
      <Select
        label="Cloud Provider"
        placeholder="Select a cloud provider"
        value={provider}
        onChange={(e) => { setProvider(e.target.value); setResource(''); setAttributes({}); }}
      >
        {Object.keys(providerResources).map(key => (
          <SelectItem key={key} value={key}>
            {key.toUpperCase()}
          </SelectItem>
        ))}
      </Select>

      {provider && (
        <Select
          label="Assign Resource"
          placeholder="Select Resource type"
          value={resource}
          onChange={(e) => { setResource(e.target.value); setAttributes({}); }}
        >
          {Object.keys(providerResources[provider]).map(key => (
            <SelectItem key={key} value={key}>
              {key.toUpperCase()}
            </SelectItem>
          ))}
        </Select>
      )}

      {resource && providerResources[provider][resource].map(attr => (
        <Input
          key={attr}
          label={attr.replace(/_/g, ' ').toUpperCase()}
          value={attributes[attr] || ''}
          onChange={(e) => handleAttributeChange(attr, e.target.value)}
        />
      ))}

      <div className="flex gap-3">
        <Button auto shadow color="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button auto shadow color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default HandlePolicy;

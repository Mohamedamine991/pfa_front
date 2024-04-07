import axios from "axios"
import { CreatePolicyBody, UpdatePolicyBody } from "@/types/iamTypes"

const getPolicies = async () => {
  return axios.get(`${process.env.BACKEND}/aws/iam/policies/`).then((r) => {
    return r.data
  })
}

const getPolicy = async (name: string) =>
  axios.get(`${process.env.BACKEND}/aws/iam/policies/${name}`).then((r) => {
    return r.data
  })

const deletePolicy = async (name: string) => {
  axios.delete(`${process.env.BACKEND}/aws/iam/policies/${name}`).then((r) => {
    return r.data
  })
}

const createPolicy = async (policy: CreatePolicyBody) =>
  axios.post(`${process.env.BACKEND}/aws/iam/policies/`, policy).then((r) => {
    return r.data
  })

const updatePolicy = async (policy: UpdatePolicyBody, name: string) =>
  axios
    .put(`${process.env.BACKEND}/aws/iam/policies/${name}`, policy)
    .then((r) => {
      return r.data
    })

export { getPolicies, getPolicy, deletePolicy, createPolicy, updatePolicy }

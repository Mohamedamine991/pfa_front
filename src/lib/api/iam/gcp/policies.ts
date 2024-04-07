import axios from "axios"
import { CreatePolicyBody } from "@/types/gcp-types"

const getPolicies = async () => {
  return axios.get(`${process.env.BACKEND}/gcp/iam/policies/`).then((r) => {
    return r.data
  })
}

const getPolicy = async (name: string) =>
  axios.get(`${process.env.BACKEND}/gcp/iam/policies/${name}`).then((r) => {
    return r.data
  })

const deletePolicy = async (name: string) => {
  axios.delete(`${process.env.BACKEND}/gcp/iam/policies/${name}`).then((r) => {
    return r.data
  })
}

const createPolicy = async (policy: CreatePolicyBody) =>
  axios.post(`${process.env.BACKEND}/gcp/iam/policies/`, policy).then((r) => {
    return r.data
  })

// const updatePolicy = async (policy: UpdatePolicyBody, name: string) =>
//   axios
//     .put(`${process.env.BACKEND}/gcp/iam/policies/${name}`, policy)
//     .then((r) => {
//       return r.data
//     })

export { getPolicies, getPolicy, deletePolicy, createPolicy }

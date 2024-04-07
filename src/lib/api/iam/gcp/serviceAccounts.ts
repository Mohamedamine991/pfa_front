import axios from "axios"
import { CreateServiceAccount } from "@/types/gcp-types"
const getServiceAccounts = async () => {
  return axios
    .get(`${process.env.BACKEND}/gcp/iam/service-accounts/`)
    .then((r) => {
      return r.data
    })
}

const getServiceAccount = async (name: string) => {
  return axios
    .get(`${process.env.BACKEND}/gcp/iam/service-accounts/${name}/`)
    .then((res) => {
      return res.data
    })
}

const deleteServiceAccount = async (target: string) => {
  return axios
    .delete(`${process.env.BACKEND}/gcp/iam/service-accounts/${target}`)
    .then((r) => {
      return r.data
    })
}

const createServiceAccount = async (service_account: CreateServiceAccount) => {
  return axios
    .post(`${process.env.BACKEND}/gcp/iam/service-accounts/`, service_account)
    .then((r) => {
      return r.data
    })
}

const enableServiceAccount = async (target: string) => {
  return axios.post(
    `${process.env.BACKEND}/gcp/iam/service-accounts/${target}/enable`
  )
}

const disableServiceAccount = async (target: string) => {
  return axios.post(
    `${process.env.BACKEND}/gcp/iam/service-accounts/${target}/disable`
  )
}

export {
  enableServiceAccount,
  disableServiceAccount,
  getServiceAccount,
  getServiceAccounts,
  createServiceAccount,
  deleteServiceAccount,
}

// const updateServiceAccount = async (user: UpdateUserBody, username: string) => {
//   return axios
//     .put(`${process.env.BACKEND}/aws/iam/users/${username}`, user)
//     .then((res) => {
//       return res.data
//     })
// }

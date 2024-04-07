import axios from "axios"
import { CreateRoleBody, UpdateRoleBody } from "@/types/gcp-types"

const getRoles = async () => {
  return axios.get(`${process.env.BACKEND}/gcp/iam/roles/`).then((r) => {
    return r.data
  })
}

const getRole = async (name: string) => {
  return axios.get(`${process.env.BACKEND}/gcp/iam/roles/${name}`).then((r) => {
    return r.data
  })
}

const deleteRole = async (name: string) => {
  return axios.delete(`/gcp/iam/roles/${name}`).then((r) => {
    return r.data
  })
}

const createRole = async (role: CreateRoleBody) => {
  return axios
    .post(`${process.env.BACKEND}/gcp/iam/roles/`, role)
    .then((re) => {
      return re.data
    })
}

const updateRole = async (role: UpdateRoleBody, name: string) => {
  return axios
    .put(`${process.env.BACKEND}/gcp/iam/roles/${name}`, role)
    .then((r) => {
      return r.data
    })
}

export { getRoles, getRole, deleteRole, createRole, updateRole }

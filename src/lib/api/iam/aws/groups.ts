import axios from "axios"
import { CreateGroupBody, UpdateGroupBody } from "@/types/iamTypes"
const getGroups = async () => {
  return axios.get(`${process.env.BACKEND}/aws/iam/groups/`).then((r) => {
    return r.data
  })
}

const getGroup = async (name: string) => {
  return axios
    .get(`${process.env.BACKEND}/aws/iam/groups/${name}`)
    .then((r) => {
      return r.data
    })
}

const deleteGroup = async (name: string) => {
  return axios
    .delete(`${process.env.BACKEND}/aws/iam/groups/${name}`)
    .then((r) => {
      return r.data
    })
}

const createGroup = async (grp: CreateGroupBody) => {
  return axios.post(`${process.env.BACKEND}/aws/iam/groups/`, grp).then((r) => {
    return r.data
  })
}

const updateGroup = async (grp: UpdateGroupBody, name: string) => {
  return axios
    .put(`${process.env.BACKEND}/aws/iam/users/${name}`, grp)
    .then((r) => {
      return r.data
    })
}

export { getGroups, getGroup, deleteGroup, createGroup, updateGroup }

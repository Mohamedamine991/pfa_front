import axios from "axios"
import { CreateUserBody, UpdateUserBody } from "@/types/iamTypes"

const getUsers = async () => {
  return axios.get(`${process.env.BACKEND}/aws/iam/users/`).then((r) => {
    return r.data
  })
}

const getUser = async (username: string) => {
  return axios
    .get(`${process.env.BACKEND}/aws/iam/users/${username}/`)
    .then((res) => {
      return res.data
    })
}

const deleteUser = async (username: string) => {
  return axios
    .delete(`${process.env.BACKEND}/aws/iam/users/${username}`)
    .then((r) => {
      return r.data
    })
}

const createUser = async (user: CreateUserBody) => {
  return axios.post(`${process.env.BACKEND}/aws/iam/users/`, user).then((r) => {
    return r.data
  })
}

const updateUser = async (user: UpdateUserBody, username: string) => {
  return axios
    .put(`${process.env.BACKEND}/aws/iam/users/${username}`, user)
    .then((res) => {
      return res.data
    })
}

export { getUsers, getUser, deleteUser, createUser, updateUser }

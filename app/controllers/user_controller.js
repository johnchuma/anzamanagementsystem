import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage"; 
import { headers } from "../utils/headers";

export const register = async (data) => {
    try { 
      const response = await axios.post(`${server_url}/user/register`, data);
      console.log(response.data)
      storeUser(response.data.tokens)
       console.log(getUser())
     return response.data
    } catch (error) { 
      console.log(error)
      return error.response;
    }
  };
  export const updateUser = async (data,uuid) => {
    try {
      const response = await axios.patch(`${server_url}/user/${uuid}`, data,{
        headers
      });
      return response.data.status
    } catch (error) {
      console.log(error);
    }
  };

    export const updateMyInfo = async (data) => {
    try {
      const response = await axios.patch(`${server_url}/user/me`, data,{
        headers
      });
      return response.data.status
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteUser = async (uuid) => {
    try {
      const response = await axios.delete(`${server_url}/user/${uuid}`,{
        headers
      });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
 

export const login = async(data)=>{
    try {
     const response = await axios.post(`${server_url}/user/login`,data)
    //  alert(response.data.tokens)
    storeUser(response.data.tokens)
     return response.data
    } catch (error) {
      console.log(error.response.data)
      return error.response.data;
    }
 }

 
 export const resetPassword = async(data)=>{
  try {
   const response = await axios.post(`${server_url}/user/reset-password`,data)
   return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export const newPassword = async(data,uuid)=>{
  try {
   const response = await axios.patch(`${server_url}/user/password/${uuid}`,data)
  //  console.log(response.data.response)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
 export const getUsers = async(data)=>{
    try {
     const response = await axios.get(`${server_url}/user/`,{
      headers
     })
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }

 export const getUserInfo = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/user/${uuid}`,{
    headers
   })
    return response.data.body
  } catch (error) {
 
  }
}
export const getMyInfo = async()=>{
  try {
   const response = await axios.get(`${server_url}/user/me`,{
      headers
   })
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}

 export const getAllUsers = async(limit,page)=>{
  try {
   
   const response = await axios.get(`${server_url}/user/?page=${page}&limit=${limit}`,{
    headers
   })
   console.log(response.data)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}

 
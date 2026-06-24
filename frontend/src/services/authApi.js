import axios from "axios";

const authApi = axios.create({
    baseURL:"http://localhost:3000/api/auth",
});


export const signupUser = async (data) =>{
    return await authApi.post("/signup",data)
}

export const loginUser = async (data) =>{
    return await authApi.post("/login",data)
}
export default authApi;
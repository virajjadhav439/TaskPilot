import axios from 'axios';

const taskApi = axios.create({
    baseURL:"http://localhost:3000/api/tasks"
})

taskApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const getTasks = async ()=>{
    return await taskApi.get('/')
}

export const createTask = async(data)=>{
    return await taskApi.post('/',data)
}

export const updateTask = async (id,data)=>{
    return await taskApi.put(`/${id}`,data)
}

export const deleteTask = async (id)=>{
    return await taskApi.delete(`/${id}`)
}

export default taskApi
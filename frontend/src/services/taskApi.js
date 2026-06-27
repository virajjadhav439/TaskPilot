import axios from 'axios';

const taskApi = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/api/tasks`
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

export const getTaskStats = async ()=>{
    return await taskApi.get('/stats')
}

export const getAnalytics = async ()=>{
    return await taskApi.get('/analytics')
}

export const completeTask = async (id)=>{
    return await taskApi.patch(`/${id}/complete`)
}
export default taskApi
import { api } from "@/lib/axios.js"


export const authService = {
    login: async () => { 
        return await api.post("/auth/login", {email, password})
    },
    register: async (data) => { 
        return await api.post("/", data)
    },
    getProfile: async () => {
        return await api.get("/auth/profile")
    },
}
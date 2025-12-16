import { api } from "@/lib/axios.js"

export const authService = {
    login: async (email, password) => {
        return await api.post("/auth/login", {email, password})
    },
    register: async (data) => { 
        return await api.post("/users/", data) 
    },
    getProfile: async () => {
        return await api.get("/auth/profile")
    },
}
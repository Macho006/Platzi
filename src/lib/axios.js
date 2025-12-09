import axios from "axios";
import { config } from "zod";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.escuelajs.co/api/v1/"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)  
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const orginalRequest = error.config

    if (error.response && error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refresh_token")

        if (!refreshToken) {
          throw new Error("Refresh token mavjud emas")
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken: refreshToken
        })

        const { access_token, refresh_token } = response.data

        localStorage.getItem("access_token", access_token)
        localStorage.getItem("refresh_token", refresh_token)

        orginalRequest.headers.Authorization = `Bearer ${access_token}`

        return api(orginalRequest)
        
      } catch (refreshError) {
        console.error("Session expired. Please login again.")

        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_data")

        window.location.href = "/login"

        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api

import { authService } from "@/services/auth-service";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    login : async (email, password) => {
      set({ loading: true, error: null })

      try {
         const {access_token, refresh_token} = await authService.login(email, password)

         localStorage.setItem("access_token", access_token)
         localStorage.setItem("refrsh_token", refresh_token )

         const user = await authService.getProfile()

         set({
            user: user,
            isAuthenticated: true,
            loading: false
         })

         return true
      } catch (error) {
         set({
            error: error.response?.data?.message || "Login failed",
            loading: false
         })
         return false
      }
    },

    logout: () => {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      set({ user: null, isAuthenticated: false })
    },

    checkAuth: async () => {
      const token = localStorage.setItem("access_token")
      if (!token) return

      try {
         const user = await authService.getProfile()
         set({ user: user, isAuthenticated: false })
      } catch (error) {
         localStorage.removeItem("access_token")
         localStorage.removeItem("refresh_token")
         set({ user: null, isAuthenticated: false })
      }
    }
 }))

 export default useAuthStore
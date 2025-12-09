import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useActionState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export const ProtactedRoutes= () => {
    const { isAuthenticated, checkAuth } = useAuthStore()
    const loaction = useLocation()
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const token = localStorage.getItem("access_token")

    if (!token && !isAuthenticated) {
        return <Navigate to="/login" state={{from: loaction}} replace />
    }
    
    return <Outlet />
}

export default ProtactedRoutes
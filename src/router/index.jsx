import { createBrowserRouter } from "react-router-dom";
import ProtactedRoutes from "@/components/auth/protacted-routers";
import Home from "@/pages/home";
import AuthLayout from "@/layouts/auth-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import MainLayout from "@/layouts/main-layout";

 const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        element: <ProtactedRoutes />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    }
                ]
            }
        ]
    }
])

export default router
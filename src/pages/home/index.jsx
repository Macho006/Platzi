import React from 'react';
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleClick = () => {
    navigate("/getproducts")
  }

  return (
    <div className="min-h-[80vh] w-full p-4">
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Platzi</h1>
        <div className='flex gap-3'>
          <Avatar className="w-8 h-8 mb-4">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-2xl bg-slate-200">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <Button onClick={handleLogout} className="w-full h-8 sm:w-auto gap-2 cursor-pointer">
            <LogOut size={18} />
          </Button>
        </div>
      </div>
      <Button onClick={handleClick}>Get Products</Button>
    </div>
  );
}
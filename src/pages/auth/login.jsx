import React, { useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const { login, loading, error } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isSuccess = await login(email, password)
    
    if (isSuccess) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Kirish</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@mail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Parol</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="******"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
        >
          {loading ? 'Yuklanmoqda...' : 'Kirish'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Hisobingiz yo'qmi?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  )
}
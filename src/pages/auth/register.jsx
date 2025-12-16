import React, { useState } from 'react'
import { authService } from '@/services/auth-service'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await authService.register(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || "Ro'yxatdan o'tishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {Array.isArray(error) ? error.join(', ') : error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ism</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Parol</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
           <input 
             type="text"
             name="avatar"
             value={formData.avatar}
             onChange={handleChange}
             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
           />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-green-300"
        >
          {loading ? 'Yaratilmoqda...' : 'Yuborish'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Akkauntingiz bormi?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  )
}
import React from 'react'
import { useState } from 'react'
import api from "../api/axios"

const Signup = () => {

  const [form, setform] = useState({
    name: "",
    email:"",
    password:"",
  })

  const [msg, setmsg] = useState("")

  const handleChange = (e)=>{
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup",form)
      setmsg(response.data.message)
    } catch (error) {
      setmsg(error.response?.data?.message || "An error occured");
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
    {/* Card Container */}
    <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md border border-slate-100">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-slate-500 mt-2 text-sm">Join us to start managing your hub</p>
      </div>

      {/* Dynamic Feedback Message */}
      {msg && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium text-center animate-in fade-in duration-300">
          {msg}
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Full Name</label>
          <input 
            name="name"  
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Email Address</label>
          <input 
            name="email"  
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Password</label>
          <input 
            name="password"  
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-slate-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 mt-2"
        >
          Get Started
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account?{' '}
          <a href="/login" className="text-slate-900 font-bold hover:underline underline-offset-4">
            Sign In
          </a>
        </p>
      </div>
    </div>
  </div>
);
}

export default Signup

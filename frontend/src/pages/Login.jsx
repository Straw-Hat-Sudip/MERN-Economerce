import { useState } from "react";
import { useNavigate } from 'react-router'
import api from "../api/axios"

const Login = () => {

  const [form, setform] = useState({
    email: "",
    password: "",
  })

  const[msg,setmsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();


    try {
      const res = await api.post("/auth/login", form)
      console.log(res,"data")

      //save token to localstorage
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.user.id)

      setmsg("Login Successfully");
      setTimeout(() => {
        navigate("/")
      }, 1000);

      
    } catch (error) {
      setmsg(error.response?.data?.message || "An error occured");
    }
  }


  return (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
    {/* Card Container */}
    <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/60 w-full max-w-md border border-slate-100">
      
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Welcome back</h2>
        <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in</p>
      </div>

      {/* Message Callout */}
      {msg && (
        <div className='bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center justify-center animate-pulse'>
          {msg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Email Address</label>
          <input
            name='email'
            type="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={handleChange}
            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400'
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 ml-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
            <a href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
          </div>
          <input
            name='password'
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400'
            required
          />
        </div>

        <button 
          type='submit' 
          className='w-full bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200'
        >
          Sign in
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="font-bold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login


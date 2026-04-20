import {Link, useNavigate} from "react-router"
import { useEffect } from 'react'
import { useState } from 'react'
import api from "../api/axios"
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();
    const [cartCount, setcartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(()=>{
        const loadCart = async () =>{
            if(!userId){
                setcartCount(0)
                return;
            }

            const res = await api.get(`/cart/${userId}`);
            if (!res.data || !res.data.items) {
                setcartCount(0);
                return;
            }

            const total = res.data.items.reduce(
                (sum, item) => sum + item.quantity, 0
            );
            setcartCount(total)
        }

        loadCart();
        window.addEventListener("cartUpdated", loadCart)

        return ()=>{
            window.removeEventListener("cartUpdated", loadCart)
        }
    },[userId])
    
    const logout = ()=>{
        localStorage.clear();
        setcartCount(0);
        navigate("/login");
    }
//   return (
//     <nav className="flex justify-between p-4 shadow">
//         <Link to="/" className="font-bold text-xl">Electronics Hub</Link>

//         <div className="flex gap-4 items-center">
//             <Link to="/cart" className="relative text-xl">
//                 <ShoppingCart />
//                 {
//                     cartCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs ">
//                             {cartCount}
//                         </span>
//                     )
//                 }
//             </Link>

//             {
//                 !userId ? (
//                     <>
//                         <Link to="/login" className="text-lg">Login</Link>
//                         <Link to="/signup" className="text-lg">Signup</Link>
//                         <Link></Link>
//                     </>

//                 ):(
//                     <button onClick={logout} className="text-lg">Logout</button>
//                 )
//             }
//         </div>
//     </nav>
//   )

return (
  <nav className="sticky top-0 z-50 bg-white/90 border-b border-slate-100 px-6 py-4 shadow-sm backdrop-blur-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Brand Logo */}
      <Link 
        to="/" 
        className="text-2xl font-black text-slate-900 tracking-tighter hover:text-indigo-600 transition-colors"
      >
        Electronics<span className="text-indigo-600">Hub</span>
      </Link>

      {/* Navigation Actions */}
      <div className="flex gap-8 items-center">
        {/* Cart Icon with Fixed Badge */}
        <Link 
          to="/cart" 
          className="group relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-all"
        >
          <ShoppingCart size={24} strokeWidth={2.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[10px] font-bold h-5 w-5 flex items-center justify-center border-2 border-white ring-1 ring-rose-200">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
          {!userId ? (
            <>
              <Link 
                to="/login" 
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-md shadow-slate-200"
              >
                Join Now
              </Link>
            </>
          ) : (
            <button 
              onClick={logout} 
              className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-2"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
);
}

export default Navbar

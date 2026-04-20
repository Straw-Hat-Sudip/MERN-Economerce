import { useState, useEffect } from 'react'
import api from "../api/axios"
import {Link, useParams} from "react-router"
import { ShoppingCart, Heart, Plus, Edit3, Trash2 } from "lucide-react";



const ProductDetails = () => {

  const {id} = useParams();
  const [product, setproduct] = useState(null);

  

  const loadProduct = async ()=>{
    const res = await api.get("/products");
    const p = res.data.find((item)=> item._id === id) ;
    setproduct(p);
  }

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add to cart");
      return;
    }

    try {
      const res = await api.post("/cart/add", { userId, productId });
      // Sync the count for the Navbar badge
      const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      alert("Could not add to cart. Try again later.");
    }
  };

  useEffect(()=>{
    loadProduct();
  },[]);

  if(!product){
    return <div>Loading.....</div>
  }

  return (
  <div className="min-h-screen bg-slate-50 py-12 px-4">
    {/* Navigation/Back Link */}
    <div className="max-w-6xl mx-auto mb-8">
      <Link to="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-semibold transition-colors">
        ← Back to Store
      </Link>
    </div>

    {/* Main Product Card */}
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left: Premium Image Gallery Feel */}
        <div className="lg:w-1/2 bg-white p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="relative group">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full max-h-[450] object-contain transition-transform duration-500 group-hover:scale-105" 
            />
            {/* Subtle Badge */}
            <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-tight">
              In Stock
            </div>
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-4">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
              {product.category || 'Premium Tech'}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {product.title}
          </h1>

          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Pricing Section */}
          <div className="flex items-end gap-3 mb-10 pb-8 border-b border-slate-100">
            <p className="text-4xl font-black text-slate-900 tracking-tighter">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-slate-400 text-sm mb-1 font-medium italic">
              (Includes all taxes)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => addToCart(product._id)}
              className="flex-1 bg-slate-900 text-white font-bold py-5 px-8 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3 text-lg"
            >
              <ShoppingCart size={22} strokeWidth={2.5} />
              Add to Cart
            </button>
            
            <button className="p-5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-rose-500">
              <Heart size={24} />
            </button>
          </div>

          {/* Shipping/Security Trust Bar */}
          <div className="mt-8 flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Free Express Delivery</span>
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span>Secure Checkout</span>
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span>1 Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ProductDetails



import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link, useNavigate } from 'react-router';

const Cart = () => {

  const userId = localStorage.getItem("userId")
  const [cart, setCart] = useState(null)
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return

    try {
      const res = await api.get(`/cart/${userId}`)
      setCart(res.data)
    } catch (err) {
      console.error("Failed to load cart", err)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const removeItem = async (productId) => {
    await api.post("/cart/remove", { userId, productId })
    loadCart()
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQty = async (productId, quantity) => {

    if (quantity === 0) {
      await removeItem(productId)
      return
    }

    await api.post("/cart/update", { userId, productId, quantity })
    loadCart()
    window.dispatchEvent(new Event("cartUpdated"))

  }

  if (!cart) {
    return <div className="p-6">Loading...</div>
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  )

  return (
  <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen">
    {/* Header */}
    <div className="flex items-baseline justify-between mb-10">
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Cart</h1>
      <p className="text-slate-500 font-medium">{cart.items.length} items</p>
    </div>

    {!cart || cart.items.length === 0 ? (
      <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-200">
        <p className="text-slate-400 text-lg italic">Your shopping bag is empty.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">
          Go back to shopping
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md group"
            >
              {/* Product Image */}
              <div className="w-24 h-24 bg-slate-50 rounded-xl p-2 shrink-0">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Product Details */}
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.productId.title}
                </h3>
                <p className="text-slate-500 font-semibold mt-1">
                  ₹{item.productId.price.toLocaleString()}
                </p>
                
                {/* Mobile/Compact Actions */}
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-rose-500 text-xs font-bold uppercase tracking-widest mt-3 hover:text-rose-700 transition-colors"
                >
                  Remove
                </button>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
                <button
                  onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 text-slate-900 font-bold transition-transform active:scale-90"
                >
                  -
                </button>
                <span className="px-4 font-black text-slate-700 w-10 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 text-slate-900 font-bold transition-transform active:scale-90"
                >
                  +
                </button>
              </div>

              {/* Price Display */}
              <div className="ml-10 text-right min-w-25">
                <p className="text-xl font-black text-slate-900">
                  ₹{(item.quantity * item.productId.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-500 font-bold tracking-tight uppercase text-xs">Free</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                <span className="text-slate-900 font-bold">Total</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={()=> navigate("/checkout-address")} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200">
              Checkout Now
            </button>
            
            <p className="text-center text-slate-400 text-xs mt-6 px-4">
              Secure Checkout • 30-Day Money Back Guarantee
            </p>
          </div>
        </div>

      </div>
    )}
  </div>
);
}

export default Cart

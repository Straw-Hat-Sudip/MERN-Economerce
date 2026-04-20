import { useEffect, useState, Link } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { Check, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setaddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setcart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    api.get(`/cart/${userId}`).then((res) => setcart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setaddress(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, [userId, navigate]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.productId.price,
    0,
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const res = await api.post("/orders/place", {
        userId,
        address: selectedAddress,
      });

      console.log(res.data);

      navigate(`/order-success/${res.data.orderId}`); // optional
    } catch (err) {
      console.error(err.response?.data);
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Finalize Order
          </h1>
          <p className="text-slate-500 font-medium">
            Review your details and confirm shipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Address Selection (2/3 Width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Shipping Address
              </h2>
              <button
                onClick={() => navigate("/checkout-address")}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {address.map((addr) => (
                <label
                  key={addr._id}
                  className={`relative cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 block group ${
                    selectedAddress?._id === addr._id
                      ? "border-indigo-600 bg-white shadow-xl shadow-indigo-100/50"
                      : "border-slate-200 bg-white/50 hover:border-slate-300"
                  }`}
                >
                  {/* The Hidden Radio Input */}
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectedAddress(addr)}
                    className="sr-only" // Use 'sr-only' to hide visually but keep accessible
                  />

                  {/* Selection Indicator (The Checkmark) */}
                  <div
                    className={`absolute top-4 right-4 transition-all ${
                      selectedAddress?._id === addr._id
                        ? "bg-indigo-600 scale-100"
                        : "bg-slate-100 scale-0"
                    } rounded-full p-1 text-white`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </div>

                  {/* Content */}
                  <p className="font-black text-slate-900 mb-1 uppercase tracking-tight text-sm">
                    {addr.fullName}
                  </p>

                  <p className="text-slate-500 text-sm mb-3 font-medium">
                    {addr.phone}
                  </p>

                  <div className="text-slate-600 text-sm leading-relaxed">
                    <p>{addr.addressLine}</p>
                    <p>
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right: Order Summary Sidebar (1/3 Width) */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-300">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">
                    Free
                  </span>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-lg">Order Total</span>
                  <span className="text-3xl font-black tracking-tighter text-white">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Final Checkout Action */}
              <button
                onClick={placeOrder}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-3 text-lg"
              >
                Checkout
                <ArrowRight size={22} strokeWidth={3} />
              </button>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Secure 256-bit Encryption
                </div>

                {/* Trust Badge for COD */}
                <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-[9px] text-slate-400 font-medium italic">
                  No payment required now. Pay ₹{total.toLocaleString()} upon
                  delivery.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

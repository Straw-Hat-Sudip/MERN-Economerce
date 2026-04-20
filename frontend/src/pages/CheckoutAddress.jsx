import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setform] = useState({
    fullName: "",
    addressLine: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    await api.post("/address/add", {
      ...form,
      userId,
    });
    navigate("/checkout");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Shipping Address
        </h1>
        <p className="text-slate-500 mt-1">
          Enter your details to calculate delivery and taxes.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="space-y-6">
          {/* Row 1: Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Full Name
            </label>
            <input
              name="fullName"
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
            />
          </div>

          {/* Row 2: Street Address */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Street Address
            </label>
            <input
              name="addressLine"
              placeholder="123 Main St, Apt 4B"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
            />
          </div>

          {/* Row 3: City, State, Zip (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                City
              </label>
              <input
                name="city"
                placeholder="Mumbai"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                State
              </label>
              <input
                name="state"
                placeholder="Maharashtra"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Zip Code
              </label>
              <input
                name="zip"
                placeholder="400001"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 font-bold"
              />
            </div>
          </div>

          {/* Row 4: Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={saveAddress}
            className="w-full mt-4 bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
          >
            Confirm & Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;

import React from "react";
import { useParams } from "react-router";
import { Check, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 text-center border border-slate-100">
        {/* Animated Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-emerald-500 text-white p-5 rounded-full shadow-lg shadow-emerald-200">
              <Check size={48} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Order Confirmed!
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          Your tech is being prepped for shipment.
        </p>

        {/* Order Info Card */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            Transaction Receipt
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-slate-400 font-medium">Order ID:</span>
            <span className="font-mono font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
              #{id}
            </span>
          </div>
        </div>

        {/* Primary Action */}
        <button
          onClick={goHome}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </button>

        {/* Help Link */}
        <p className="mt-8 text-xs text-slate-400 font-medium">
          Having trouble?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;

import api from "../api/axios"
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {Link} from "react-router"

const AddProduct = () => {

    const [form, setform] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setform({
            ...form,
            [e.target.name]: e.target.value,
        
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            await api.post("/products/add", form);
            alert("Product added successfully")
            navigate("/admin/products");
        } catch (err) {
            console.error("Error occur while adding product", err)
        }
    }
    
//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
//         <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//             {
//                 Object.keys(form).map((key)=>(
//                     <input
//                         key = {key}
//                         name = {key}
//                         value = {form[key]}
//                         onChange={handleChange}
//                         placeholder={key}
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                 ))
//             }
            
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Product</button>
//         </form>
      
//     </div>
//   )

return (
  <div className="max-w-4xl mx-auto mt-16 px-4 pb-20">
    {/* Header Section */}
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">New Product</h2>
        <p className="text-slate-500 mt-1">List a new item in the Electronics Hub catalog</p>
      </div>
      <Link to="/admin/products" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
        Cancel & Exit
      </Link>
    </div>

    {/* Form Container */}
    <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Product Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., iPhone 15 Pro Max"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g., Smartphones"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Description (Textarea) */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Technical specifications and features..."
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300 resize-none"
            required
          />
        </div>

        {/* Pricing and Stock Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Price (₹)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Stock Level</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 text-sm"
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-5 px-8 rounded-2xl hover:bg-slate-800 active:scale-[0.99] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 text-lg"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default AddProduct

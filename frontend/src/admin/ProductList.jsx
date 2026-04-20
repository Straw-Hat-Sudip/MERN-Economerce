import {useState, useEffect} from 'react'
import api from "../api/axios"
import { Link } from 'react-router'
import { Plus, ShoppingCart, Edit3, Trash2, Package, Heart } from "lucide-react";


const ProductList = () => {

    const [products, setproducts] = useState([]);

    const loadProduct = async ()=>{
        const response = await api.get("/products");
        setproducts(response.data);
    }

    const deleteProduct = async (id)=>{
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully")
            loadProduct();
        } catch (err) {
            console.error("Error while deleting the product",err)
        }
    }

    useEffect(()=>{
        loadProduct();
    },[])

return (
  <div className="max-w-6xl mx-auto mt-12 px-6 pb-20">
    {/* Dashboard Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Inventory</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage and update your product catalog</p>
      </div>
      
      <Link 
        to="/admin/products/add" 
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
      >
        <Plus size={20} />
        Add New Product
      </Link>
    </div>

    {/* Table Container */}
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Product Details</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Price</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Inventory Status</th>
            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
              {/* Title & Info */}
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  {/* Thumbnail Placeholder - adds a pro touch */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                    {product.image ? (
                      <img src={product.image} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={20} />
                    )}
                  </div>
                  <span className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </span>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-6">
                <span className="font-black text-slate-700">₹{product.price.toLocaleString()}</span>
              </td>

              {/* Stock Status Indicator */}
              <td className="px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className={`text-sm font-bold ${product.stock > 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {product.stock} in stock
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end items-center gap-3">
                  <Link 
                    to={`/admin/products/edit/${product._id}`} 
                    className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    title="Edit Product"
                  >
                    <Edit3 size={20} />
                  </Link>
                  <button 
                    onClick={() => deleteProduct(product._id)} 
                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Delete Product"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Empty State */}
      {products.length === 0 && (
        <div className="p-20 text-center">
          <p className="text-slate-400 font-medium">No products found in the catalog.</p>
        </div>
      )}
    </div>
  </div>
);
}

export default ProductList

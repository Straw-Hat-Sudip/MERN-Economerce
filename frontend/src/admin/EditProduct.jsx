import { useState, useEffect } from "react"
import api from "../api/axios"
import { useNavigate, useParams,  Link } from "react-router"

const EditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  })

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock"
  ]

  const loadProduct = async () => {
    try {
      const res = await api.get("/products")

      const product = res.data.find((p) => p._id === id)

      if (product) {
        setForm(product)
      }
    } catch (err) {
      console.error("Error loading product", err)
    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/products/update/${id}`, form)

      alert("Product updated successfully")

      navigate("/admin/products")

    } catch (err) {
      console.error("Error occur while updating product", err)
    }
  }

  // return (
  //   <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">

  //     <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

  //     <form onSubmit={handleSubmit} className="space-y-3">

  //       {Object.keys(form).map((key) =>
  //         allowedFields.includes(key) && (
  //           <input
  //             key={key}
  //             name={key}
  //             value={form[key]}
  //             onChange={handleChange}
  //             placeholder={key}
  //             className="w-full p-2 border border-gray-300 rounded"
  //           />
  //         )
  //       )}

  //       {/* UPDATE BUTTON */}
  //       <button
  //         type="submit"
  //         className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
  //       >
  //         Update Product
  //       </button>

  //     </form>

  //   </div>
  // )

return (
  <div className="max-w-7xl mx-auto mt-16 px-6 pb-20">
    {/* Page Header */}
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Edit Product</h2>
        <p className="text-slate-500 mt-1 italic text-sm">Product ID: {form._id}</p>
      </div>
      <Link to="/admin/products" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
        Cancel Changes
      </Link>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      
      {/* LEFT: FORM SECTION (3/5 Width) */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
          
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Metrics: Price, Stock, Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Price (₹)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none font-black text-indigo-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Stock Count</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3 text-lg mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* RIGHT: LIVE PREVIEW (2/5 Width) */}
      <div className="lg:col-span-2 space-y-6">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Live Preview</label>
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm sticky top-24">
          <div className="h-64 bg-slate-50 flex items-center justify-center p-8">
            <img 
              src={form.image || "https://via.placeholder.com/300?text=No+Image"} 
              alt="Preview" 
              className="max-h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="p-8">
            <div className="text-xs font-bold text-indigo-600 uppercase mb-2">{form.category || "Category"}</div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">{form.title || "Product Title"}</h3>
            <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
              {form.description || "No description provided yet."}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-slate-900">₹{Number(form.price).toLocaleString()}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${form.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {form.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-slate-400 text-xs italic">
          This is how the product card appears in the main storefront.
        </p>
      </div>

    </div>
  </div>
);
}

export default EditProduct
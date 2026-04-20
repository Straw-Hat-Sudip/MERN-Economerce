
import { useState, useEffect } from 'react'
import api from "../api/axios"
import { Link } from "react-router"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Debounced Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadProducts();
    }, 400); // Wait 400ms after the user stops typing before calling the API

    return () => clearTimeout(delayDebounceFn);
  }, [search, category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className='mb-8 flex flex-col md:flex-row gap-4'>
        <input 
          placeholder='Search products...'
          value={search}
          // Fixed the casing here: setSearch
          onChange={(e) => setSearch(e.target.value)} 
          className='border px-4 py-2 rounded-lg w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 outline-none'
        />

        <select 
          value={category}
          // Fixed the casing here: setCategory
          onChange={(e) => setCategory(e.target.value)}
          className='border px-4 py-2 rounded-lg bg-white'
        >
          <option value="">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Tablets">Tablets</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Updating results...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="group border rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white flex flex-col"
              >
                <Link to={`/products/${product._id}`} className="grow">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h2 className="font-bold text-gray-800 line-clamp-1">{product.title}</h2>
                  <p className="text-blue-600 font-bold mt-1">Rs. {product.price}</p>
                </Link>

                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              No products found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home

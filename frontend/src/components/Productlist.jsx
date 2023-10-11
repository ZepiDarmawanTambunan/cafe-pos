import React, {useState, useEffect} from 'react'
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import api from '../api/index.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  }

  const deleteProduct = async (productId) => {
    const question = confirm("Apakah anda yakin ?");
    if(question){
        const response = await api.delete(`/products/${productId}`);
        // console.log(response);
        getProducts();
    }
  }

  return (
    <div>
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Products</h2>
        <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">List of products</p>
        <Link to="/products/add" className='px-2 py-2 bg-blue-600 text-white hover:text-white my-2 inline-block'>Add New</Link>
        <div className="container mx-auto p-8">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">No</th>
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Created By</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map((product, index) => (
                        <tr key={product.uuid}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.price}</td>
                            <td className="border px-4 py-2">{product.user.name}</td>
                            <td className="border px-4 py-2">
                            <img
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt="Preview"
                                className="my-2"
                                style={{ maxWidth: "200px", maxHeight: "100px" }}
                            />
                            </td>
                            <td className="border px-4 py-2">
                                <div className="flex flex-col md:flex-row justify-center items-center">
                                    <Link to={`/products/edit/${product.uuid}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-blue hover:text-white">
                                        <IoPencilOutline />
                                    </Link>
                                    <button onClick={() => deleteProduct(product.uuid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red">
                                        <IoTrashOutline />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className='border px-4 py-2 text-center'>Data kosong</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ProductList
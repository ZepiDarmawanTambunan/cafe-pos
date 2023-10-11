import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
      if (e.target.files.length > 0) {
          const selectedImage = e.target.files[0];
          setImage(selectedImage);
          setImagePreview(URL.createObjectURL(selectedImage));
      }else{
          setImage(null);
          setImagePreview(null);
      }
  };
  
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await api.post('/products', formData);
      navigate("/products");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Products</h2>
        <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">Add New Product</p>
        <form onSubmit={saveProduct}>
          <p className='text-center text-red-600'>{msg}</p>
          <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="name" type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price*</label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="price" type="text" placeholder="Price" required value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="image" type="file" placeholder="product image" onChange={handleImageChange}/>
          </div>
          {imagePreview && (
            <img
                src={imagePreview}
                alt="Preview"
                className="my-2"
                style={{ maxWidth: "200px" }}
                />
          )}
          <div className="flex items-center justify-between">
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green">Save</button>
          </div>
        </form>
    </div>
  )
}

export default FormAddProduct
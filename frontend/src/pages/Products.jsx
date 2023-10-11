import React, { useEffect } from 'react'
import Layout from './Layout'
import ProductList from '../components/Productlist'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);
  
  return (
    <Layout>
      <main className="p-4 md:p-8 rounded mt-28 mb-8 md:mt-20 md:mb-12">
        <ProductList/>
      </main>
    </Layout>
  )
}

export default Products
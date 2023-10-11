import React, { useEffect } from 'react'
import FormAddProduct from '../components/FormAddProduct'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddProduct = () => {
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
        <FormAddProduct/>
      </main>
    </Layout>
  )
}

export default AddProduct
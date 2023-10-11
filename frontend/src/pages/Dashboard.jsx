import React from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {getMe} from '../features/authSlice'

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state => state.auth));

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
      <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Beranda</h2>
      <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">
        Welcome <span className="font-semibold text-[#435334]">{user && user.name}</span>
      </p>
      </main>
    </Layout>
  )
}

export default Dashboard
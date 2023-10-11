import React, { useEffect } from 'react'
import Layout from './Layout'
import Userlist from '../components/Userlist'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Users = () => {
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
    if(user && user.role !== 'admin'){
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <main className="p-4 md:p-8 rounded mt-28 mb-8 md:mt-20 md:mb-12">
        <Userlist/>
      </main>
    </Layout>
  )
}

export default Users
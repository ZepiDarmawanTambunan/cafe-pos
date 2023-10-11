import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Products from '../pages/Products';
import Users from '../pages/Users';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/Welcome';

const RoutesIndex = () => { 
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/welcome' element={<Welcome/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/users/add' element={<AddUser/>}/>
        <Route path='/users/edit/:id' element={<EditUser/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/add' element={<AddProduct/>}/>
        <Route path='/products/edit/:id' element={<EditProduct/>}/>
    </Routes>
  )
}

export default RoutesIndex
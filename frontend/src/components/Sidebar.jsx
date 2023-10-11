import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import {IoPerson, IoPricetag, IoHome, IoLogOut} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  }

  return (
    <aside
      className="bg-[#FAF1E4] w-1/5 py-4 overflow-y-auto transition-width ease-in-out duration-500 print:hidden"
    >
      <div className="flex flex-col mt-28">
        <div className="pl-4 pb-2 text-gray-500 text-sm font-bold">General</div>
        <SidebarLink to="/dashboard" location={location}>
          <IoHome/>
          <span className='m-0 md:ml-2 hidden md:inline-block'>
           Dashboard
          </span>
        </SidebarLink>
        <SidebarLink to="/products" location={location}>
          <IoPricetag/>
          <span className='m-0 md:ml-2 hidden md:inline-block'>
            Products
          </span>
        </SidebarLink>

        {user && user.role === "admin" && (
          <>
            <div className="pl-4 pb-2 text-gray-500 text-sm font-bold">Admin</div>
            <SidebarLink to="/users" location={location}>
              <IoPerson/>
              <span className='m-0 md:ml-2 hidden md:inline-block'>
                Users
              </span>
            </SidebarLink>
          </>
        )}
        
        <div className="pl-4 pb-2 text-gray-500 text-sm font-bold">Settings</div>
        <button onClick={logout} className={`py-2 text-base flex items-center justify-center md:justify-start font-semibold px-3 mx-4 rounded hover:bg-[#263A29] hover:text-white transition duration-500 mb-4 bg-[#CEDEBD] text-[#435334] border-0`}
        >
          <IoLogOut/>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
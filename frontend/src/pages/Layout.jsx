import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex w-screen">
          <Sidebar />
          <div className="overflow-y-auto w-full bg-[#F5F5F5]">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout;
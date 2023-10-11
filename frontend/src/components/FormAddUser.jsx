import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate("/users");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Users</h2>
        <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">Add New User</p>
        <form onSubmit={saveUser}>
              <p className='text-center text-red-600'>{msg}</p>
              <div className="my-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="name" type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="my-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Confirm Password</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="confirm_password" type="password" placeholder="ConfirmPassword" required value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="role"
                        name="role"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}    
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <IoChevronDown />
                    </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green" type="submit">Save</button>
              </div>
          </form>
    </div>
  )
}

export default FormAddUser
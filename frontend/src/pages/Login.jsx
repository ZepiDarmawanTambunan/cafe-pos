import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LoginUser, reset} from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(user || isSuccess){
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={Auth}>
              {isError && <p className='text-center my-2'>{message}</p>}
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="flex items-center justify-between">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green" type="submit">
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Login
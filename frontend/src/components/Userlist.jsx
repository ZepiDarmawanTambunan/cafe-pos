import { useEffect, useState } from 'react';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../api/index.jsx';

const Userlist = () => {
   const [users, setUsers] = useState([]);
    // paginate
   const [page, setPage] = useState(0);
   const [limit, setLimit] = useState(10);
   const [pages, setPages] = useState(0);
   const [rows, setRows] = useState(0);
   const [keyword, setKeyword] = useState("");
   const [query, setQuery] = useState("");
   const [msg, setMsg] = useState("");

   useEffect(() => {
    getUsers();
   }, [page, keyword]);

   const getUsers = async () => {
    // const response = await axios.get('http://localhost:5000/users');
    // setUsers(response.data);
    
    // paginate
    const response = await api.get(`/users?search=${keyword}&page=${page}&limit=${limit}`);
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
   }

   const deleteUser = async (userId) => {
        const question = confirm("Apakah anda yakin ?");
        if(question){
            await api.delete(`/users/${userId}`);
            getUsers();
        }
    }

  const handlePageChange = ({selected}) => {
    setPage(selected);
        if(selected === 9){
            setMsg('Jika tidak ditemukan data yang anda cari, silahkan cari data melalui input search');
        }else{
            setMsg('');
        }
    };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  }
  
   return (
    <div>
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Users</h2>
        <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">List of users</p>
        <Link to="/users/add" className='px-2 py-2 bg-blue-600 text-white hover:text-white my-2 inline-block'>Add New</Link>
        {/* START SEARCH */}
        <form className="relative w-full mt-4" onSubmit={searchData}>
            <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
            <button
                type='submit'
                className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r focus:outline-none focus:ring focus:border-blue-300">
                Search
            </button>
        </form>
        {/* END SEARCH */}
        <div className="container mx-auto p-8">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">No</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? 
                            users.map((user, index) => (
                                <tr key={user.uuid}>
                                    <td className="border px-4 py-2">{index+1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex flex-col md:flex-row justify-center items-center">
                                            <Link to={`/users/edit/${user.uuid}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-blue hover:text-white">
                                                <IoPencilOutline />
                                            </Link>
                                            <button onClick={() => deleteUser(user.uuid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red">
                                                <IoTrashOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        :   (
                            <tr>
                                <td colSpan={5} className='border px-4 py-2 text-center'>Data kosong</td>
                            </tr>
                        )    
                        }
                    </tbody>
                </table>
                {/* START PAGINATE */}
                <p className='mt-2'>Total rows: {rows} page: {rows ? page + 1 : 0} of {pages}</p>
                <p className='my-2 text-sm text-red-600'>{msg}</p>
                <ReactPaginate
                    pageCount={Math.min(10, pages)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    previousLabel={'< Previous'}
                    nextLabel={'Next >'}
                    breakLabel={'...'}
                    containerClassName={'flex justify-center items-center mt-4 space-x-2'}
                    pageLinkClassName={'hover:text-white hover:bg-blue-600 px-4 py-2 border rounded-md inline-block'}
                    previousLinkClassName={'hover:bg-blue-600 px-4 py-2 border rounded-md inline-block bg-white text-blue-600'}
                    activeLinkClassName={'inline-block bg-blue-600 text-white'}
                    nextLinkClassName={'hover:bg-blue-600 px-4 py-2 border rounded-md inline-block bg-white text-blue-600'}
                    disabledLinkClassName={'hover:text-blue-600 hover:bg-white px-4 py-2 border rounded-md inline-block bg-white text-blue-600'}
                    onPageChange={handlePageChange}
                />
                {/* END PAGINATE */}
            </div>
        </div>
    </div>
  )
}

export default Userlist
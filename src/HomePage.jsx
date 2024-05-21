import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HomePage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = 'https://jsonplaceholder.typicode.com/';


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${URL}users`);
            const data = await response.json();
            console.log(data)
            setUsers(data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <div>
            <div className='flex justify-center mt-5 text-2xl font-bold text-slate-700'>
                <div className='drop-shadow-xl'>HomePage</div>
            </div>
            <div className="m-10 grid sm:grid-col-1 sm:gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4 ">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    users.map((user, index) => {
                        return <div key={index} className="sm:w-100 md:w-50 p-8 border rounded-3xl sm:m-2 mb-3 sm:h-60 lg:h-72">
                            <div className="uppercase  md:text-base sm:text-xl mb-3 sm:mb-5 xl:mb-7 xl:text-lg text-indigo-500 font-semibold">{user.name}</div>
                            <p className="mb-3 text-lg text-gray-500">{user.email}</p>
                            <p className="mt-2 text-gray-500">{user.address.city}, {user.address.street}</p>
                            <div className=' flex mt-10 items-end '>
                                <Link to={`/user/${user.id}`} className='items-center justify-center font-bold h-5 w-14 py-5 px-10 border rounded-2xl text-md text-slate-500 bg-slate-200 flex shadow-lg shadow-slate-500'>Details</Link>
                            </div>
                        </div>
                    })
                )}
            </div>
        </div>
    )
}

export default HomePage



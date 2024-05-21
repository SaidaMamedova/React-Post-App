
import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdAddCircle, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import AddPostModal from './AddPostModal';


function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const userData = await userResponse.json();
                setUser(userData);

                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
                const postsData = await postsResponse.json();
                setPosts(postsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleAddPost = (postData) => {
        console.log('Adding post:', postData);
        setIsModalOpen(false);
    };
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col my-5 mx-10">
            <div className='flex flex-row items-center '>
                <div className='flex flex-row items-center'>
                    <Link to={'/'}><IoMdArrowRoundBack className='fill-blue-950 size-20' /></Link>
                    <p className='font-bold text-blue-950'>back</p>
                </div>
                <div className='flex flex-grow mr-16 justify-center'>
                    <h1 className='font-bold font-mono text-xl'>{user.name}</h1>
                </div>
                <div className=''>
                    <IoMdAddCircle className='size-14 fill-blue-950' onClick={openModal}/>
                </div>
            </div>
            <ul className=''>
                {posts.map(post => (
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <li className='flex flex-row items-center justify-between sm:h-14 h-28 font-sans border-[3px] border-black shadow-md rounded-lg my-3 mx-16 p-3' key={post.id}>
                            <div className="flex items-start">
                                <RiDeleteBinLine className='size-6 fill-blue-800' />
                                <p className='ml-3'>{post.title}</p>
                            </div>
                            <IoIosArrowForward className='size-6 flex text-end fill-blue-900' />
                        </li>
                    </Link>
                ))}
            </ul>
            <AddPostModal isOpen={isModalOpen} closeModal={closeModal} addPost={handleAddPost} />
        </div >
    );
}

export default UserDetails;

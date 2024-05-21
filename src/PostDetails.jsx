import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdRemoveCircle } from "react-icons/io";
import AddCommentModal from './AddCommentModal';



import { useNavigate } from "react-router-dom";

function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);


    useEffect(() => {
        const fetchPostUserComments = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const postData = await response.json();
                setPost(postData);


                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);
                // Fetch comments for the post
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPostUserComments();
    }, [postId]);


    if (loading) {
        return <p>Loading...</p>;
    }
    const handleGoBack = () => {
        navigate(-1); // Navigate back one page
    };

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    const handleRemovePost = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
            .then(() => {
                console.log('Post removed successfully');
                navigate(-1)
            })
            .catch(error => console.error('Error removing post:', error));
    }
    
    const handleOpenCommentModal = () => {
        setIsCommentModalOpen(true);
    };

    const handleCloseCommentModal = () => {
        setIsCommentModalOpen(false);
    };

    const handleAddComment = (commentData) => {
        console.log('Adding comment:', commentData);
    };

    return (
        <div className="flex flex-col my-5 mx-10">
            <div>
                <div className='flex flex-row items-center '>
                    <div className='flex flex-row items-center'>
                        <IoMdArrowRoundBack onClick={handleGoBack} className='fill-blue-950 size-20' />
                        <p className='font-bold text-blue-950'>back</p>
                    </div>
                    <div className='flex flex-grow mr-16 justify-center'>
                        {user && <h1 className='font-bold font-mono text-xl'>{user.name}</h1>}
                    </div>
                </div>
                <div className='flex flex-col mx-16'>
             {/* here i have long article */}
                    <div className='flex flex-col items-center justify-between font-sans shadow-sm rounded-lg my-3  p-3 mb-10'>
                        <h2 className='mb-5 font-bold text-2xl'>{post.title}</h2>
                        <p>{`${post.body} On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted."`}</p>
                        <div className='flex justify-end mt-7'>
                            <button className='flex flex-row p-1 bg-slate-200 hover:bg-slate-50 items-center border border-slate-100 rounded-xl' onClick={() => { handleRemovePost(post.id) }}><IoMdRemoveCircle className='size-8' /> Remove Post</button>
                        </div>
                    </div>
                    <div>
                        {/* <div className='flex p-3 border round'> */}
                        <div className='flex justify-between'>
                            <button className='flex mb-3 text-blue-500  underline' onClick={toggleCommentsVisibility}>
                                {commentsVisible ? 'Hide Comments' : 'Show Comments'}
                            </button>
                            <div>
                                <button className='text-blue-500 underline' onClick={handleOpenCommentModal}>Add Comment</button>
                                <AddCommentModal
                                    isOpen={isCommentModalOpen}
                                    closeModal={handleCloseCommentModal}
                                    addComment={handleAddComment}
                                />
                            </div>
                        </div>
                        {/* </div> */}
                        <div >{commentsVisible && (
                            <div>
                                <h3 className='font-bold mb-2'>Comments</h3>
                                {comments.map(comment => (
                                    <div className='border-[3px] rounded-lg border-zinc-900 md:py-5 py-3 px-4  mb-3' key={comment.id}>
                                        <div className='flex sm:justify-between md:flex-row flex-col'>
                                            <p className='font-bold'>{comment.name}</p>
                                            <p className='text-blue-500'>{comment.email}</p>
                                        </div>
                                        <p>{comment.body}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default PostDetails;


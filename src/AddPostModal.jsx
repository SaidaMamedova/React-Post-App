import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

function AddPostModal({ isOpen, closeModal, addPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleAddPost = () => {
        const postData = {
            title,
            body
        };
        addPost(postData);
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="add-post-modal-title"
            aria-describedby="add-post-modal-description"
        >
            <Box sx={{ width: 400, mx: 'auto', my: 22, p: 4, bgcolor: 'white', borderWidth: "2px", borderColor: 'black', borderRadius: '10px' }}>
                <h2 id="add-post-modal-title" style={{ fontWeight: "bold",fontSize: '18px',  fontFamily: "sans-serif" }}>Add New Post</h2>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Body"
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddPost}>Add Post</Button>
                <Button variant="contained" style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default AddPostModal;
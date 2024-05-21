import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

function AddCommentModal({ isOpen, closeModal, addComment }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const handleAddComment = () => {
        const commentData = {
            name,
            email,
            body
        };
        addComment(commentData);
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="add-comment-modal-title"
            aria-describedby="add-comment-modal-description"
        >
            <Box sx={{ width: 400, mx: 'auto', my: 22, p: 4, bgcolor: 'white', borderWidth: "2px", borderColor: 'black', borderRadius: '10px' }}>
                <h2 id="add-comment-modal-title" style={{ fontWeight: "bold", fontSize: '18px', fontFamily: "sans-serif" }}>Add New Comment</h2>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>
                <Button variant="contained" style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default AddCommentModal;

import express from 'express';
import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);  //get all post
router.post('/', createPost); 
router.get('/:id', getPost);  //get the specific post to edit
router.patch('/:id', updatePost); //patch for update item
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
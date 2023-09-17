import express  from "express";
import { getPosts, getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

import auth from "../middleware/auth.js";


const router = express.Router();

router.get('/',getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);          //for updating existing post;
router.delete('/:id', auth,  deletePost);       //for deleting a post;   auth is a middleware which is used to like edit and delete post after sign in
router.patch('/:id/likePost', auth, likePost);

export default router;


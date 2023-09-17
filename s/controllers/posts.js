import  express  from 'express';
import  mongoose  from 'mongoose';

import PostMessage from "../models/postMessage.js";

const router = express.Router();


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        // console.log(postMessages);
        res.status(200).json(postMessages);
        
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}



export const getPost = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
   
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//we have made a route with id in routes that id going to be fetch here like /post/123 so 123 is id here 
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO Post With this id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id , {...post, _id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO Post With this id');


    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id=== String(req.userId));    // if he already like a post or not

    if(index===-1) {
        //like the post
        post.likes.push(req.userId);
    }else {
        //dislike the post
        post.likes = post.likes.filter((id) => id!== String(req.userId));           // filtering out likes by removing he userId like it return array of all the likes except current person like
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});     //post at line 63

    res.status(200).json(updatedPost);

}

export default router;





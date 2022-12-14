import express from 'express';
import mongoose from 'mongoose';
import PostModel from '../models/postModel.js';

export const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const post = await PostModel.find();  //find( takes time -> asynchronous action -> put await -> put async)
        res.status(200).json(post);   // status 200 means ok -> return json
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { content, userName, tags, selectedFile } = req.body; 
    const newPost = new PostModel({ content, userName, tags, selectedFile  }); 
    try {
        await newPost.save();
        res.status(201).json(newPost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await PostModel.findById(id); 
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content, userName, tags, selectedFile } = req.body;
    const updatedPost = { content, userName, tags, selectedFile, _id: id };
    
    //check if id is a mongoose object
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostModel.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostModel.findById(id);
    const updatedPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true }); 
    res.json(updatedPost);
}

// export default router;
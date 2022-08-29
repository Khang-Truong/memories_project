import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
} from '../constants/actionTypes';
import * as api from '../api/indexAPI.js';

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAllPosts();  
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);  //change database through API
		dispatch({ type: UPDATE, payload: data });  //change front-end (UI) by redux
	} catch (error) {
		console.log(error.message);
	}
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

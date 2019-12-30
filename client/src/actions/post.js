import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Get posts
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postId, likes: res.data },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postId, likes: res.data },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Add post
export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Add post
export const addComment = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(`/api/posts/comment/${id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

// Delete post
export const deleteComment = (id, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${id}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId,
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

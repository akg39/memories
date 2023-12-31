import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

// const url = 'http://localhost:5000/posts';
API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) =>API.post('/user/signin', formData);  // post request Hey database get me some data and return it to me
export const signUp = (formData) =>API.post('/user/signup', formData);


import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
      
      dispatch({ type: FETCH_POST, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };



// Action creators are functions that returns actions 53:05
export const getPosts = () => async(dispatch) => {       //imported in ./src/app.js
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchPosts();

        dispatch( {type: FETCH_ALL, payload: data} );
        dispatch({ type: END_LOADING });


    } catch (error) {
        
        console.log(error.message);
    }
    // const action = { type: 'FETCH_ALL', payload: []}
    // we use return action; if there is no async function but payload take tym so we have to use async func and have to use dispatch for return
    // dispatch(action); dispatch is from redux-hunk
}

export const createPost = (post) => async (dispatch) => {

    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
       const {data} = await api.updatePost(id,post);

       dispatch({type: UPDATE , payload: data});
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async(dispatch) => {
    try {
        // console.log('aman');

         await api.deletePost(id);

        dispatch({type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}
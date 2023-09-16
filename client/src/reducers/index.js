import posts from './posts';
import auth from './auth';
import { combineReducers } from 'redux';


export default combineReducers({posts, auth});  //key value (posts: posts)is same it can also be written as only posts
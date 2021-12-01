import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import todos from './todos';

const rootReducer = combineReducers({
    todos,

})
export default rootReducer 
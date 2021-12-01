import { ADD_TODO, DELETE_TODO, GET_TODO } from "../actions/actionTypes";

const initialState = {
    todo_list: [],
    posts:[]
}

export default function todos(state = {}, action) { 
    
    switch (action.type) { 
        case ADD_TODO: {
            const {  task } = action.payload      
            return {
                ...state,   
                todo_list: task
            };
        }
        // case DELETE_TODO: { 
        //     const { id } = action.payload
        //     return {
        //         ...state,
        //         todo_list: state.filter((todo) => todo.id != id)
        //     };
        // }
        case GET_TODO: {
            const { task } = action.payload
            return {
                ...state,
                todo_list: action.payload
            };
        }
        case "FETCH_REQUEST":
            return state;
        case "FETCH_SUCCESS": 
            return { ...state, posts: action.payload };
        default:
            return state;
    }
}

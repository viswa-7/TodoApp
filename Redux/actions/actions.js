import database from '@react-native-firebase/database'
import { ADD_TODO, GET_TODO } from './actionTypes'

export const addTodo = task => {
    console.log('add to task',task)
    database().ref('ToDoList/').push({
        // id:++nextTodoId, 
        task:task
    })
    return {
        type: ADD_TODO,
        payload: { 
            // id:++nextTodoId, 
            task
        } 
    }
}

export const returnarry = () => {
    return (dispatch) => {
       return database().ref().child('ToDoList/').once('value', (snapshot) => {
            var dummy = []

            // if (!snapshot) {
            snapshot.forEach(child => {
                dummy.push({
                    ...dummy,
                    task: child.val().task
                })
            })
            // }
    

            dispatch(fetchDBSuccess(dummy))

        })
    }
}
export const fetchPostsWithRedux=()=> {
    return (dispatch) => { 
        dispatch(fetchPostsRequest());
        return fetchPosts().then(([response, json]) => {
            console.log('success')
            if (response.status === 200) {
                console.log('response from api',response)
                dispatch(fetchPostsSuccess(json))
            }
            else {
                dispatch(fetchPostsError())
            }
        })
    }
}

function fetchPosts() {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}


function fetchPostsRequest() {
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchDBSuccess(payload) {
    return {
        type: GET_TODO,
        payload
    }
}

function fetchPostsError() {
    return {
        type: "FETCH_ERROR"
    }
}

export function returnarryAsync() {
    return dispatch => {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(returnarry())
        }, 1000)
    }
}
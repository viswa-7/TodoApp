import database from '@react-native-firebase/database'

import { ADD_TODO } from './actionTypes'
let nextTodoId = 0

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
import React,{useEffect, useState} from 'react'
import { ADD_TODO, DELETE_TODO } from "../actions/actionTypes";
import database from '@react-native-firebase/database'

// function getData() {
    const DB = database().ref().child('ToDoList')
    // database().ref().parent

    let dummy = []

    DB.on('value', (snapshot) => {
        const data = [];
        // data.push(snapshot) 
        snapshot.forEach(child => {
            // console.log('child', child) 
            data.push({
                // id: child.val().id, 
                ...data, 
                task: child.val().task
            })
        })
        dummy.push(data)
        
    })
// }

const initialState = {
    todo_list: dummy
}

export default function (state = initialState, action) { 
    
    console.log('retrieve data',state)
    switch (action.type) { 
        case ADD_TODO: {
            const {  task } = action.payload      
            return {
                ...state,   
                todo_list: [...state.todo_list, {  task }]
            };
        }
        // case DELETE_TODO: { 
        //     const { id } = action.payload
        //     return {
        //         ...state,
        //         todo_list: state.filter((todo) => todo.id != id)
        //     };
        // }
        default:
            return state;
    }
}

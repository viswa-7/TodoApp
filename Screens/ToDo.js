import React, { useEffect, useState, } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, ToastAndroid } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { addTodo } from '../Redux/actions/actions';
import Toast from 'react-native-simple-toast'
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { returnarry, returnarryAsync, } from '../Redux/actions/actions'
import { fetchPostsWithRedux } from '../Redux/actions/actions';

const ToDo = ({ todo_list, addTodo, returnarry, dummy_list,props }) => {
    const [visbile, setVisible] = useState(false)
    const [toDo, setToDo] = useState('')
    const [DBArray, setDBArray] = useState([])

    const [task,setTask] = useState('') 

    useEffect(() => {
        // setDBArray(todo_list[0])
        returnarry()
    },[todo_list])

    const handleAddTodo = (dispatch) => {
        console.log('handle to do')
        dispatch(addTodo(task))
        setTask('')    
        
        setVisible(false) 
    }

    const signOut = async () => { 
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => Toast.show('Logged out successfully!'));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={signOut} style={{ width: '40%', height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, alignSelf: 'flex-end' }}>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Sign Out</Text>
            </TouchableOpacity>

            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>ToDo</Text> 
                <Text style={{ color: 'skyblue', fontSize: 20, left: 10, fontWeight: 'bold' }}>List</Text>
            </View>

            
            <View style={{flex:1,alignItems:'center'}}>
             <FlatList
                    data={todo_list}
                    contentContainerStyle={{ width: '100%' }}
                    renderItem={({ item }) => { 
                        return (
                        <View style={{ width: 200, alignSelf: 'center', backgroundColor: 'gainsboro', padding: 10, borderWidth: 1, marginTop: 10 }}>
                            <Text style={{ color: 'black', width: '100%', textAlign: 'center' }}>{item.task}</Text>
                            </View>
                        )
                    }
                    }
                />
            </View>
            <TouchableOpacity onPress={() => setVisible(true)} style={{ backgroundColor: 'green', borderRadius: 10, width: '35%', height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 2, marginBottom: 20 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Add ToDo</Text>
            </TouchableOpacity>

            <Modal
                onBackdropPress={() => setVisible(false)}
                onBackButtonPress={() => setVisible(false)}
                isVisible={visbile}
            >
                <View
                    style={{
                        height: 180,
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffff',
                        padding: 10,
                    }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <TextInput onChangeText={(val) => setTask(val)} placeholder='Enter ToDo' style={{ backgroundColor: 'white', width: '100%', height: 40, borderWidth: 1, borderRadius: 5, borderColor: 'grey', marginTop: 5 }} />
                    </View>

                    <TouchableOpacity onPress={() => { addTodo(task),setVisible(false) }} style={{ backgroundColor: 'black', borderRadius: 10, width: '35%', height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 2 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        todo_list: state.todos.todo_list,
        dummy_list:state.todos.posts
    }
}

// const mapDispatchToProps = { fetchPostsWithRedux }

const mapDispatchToProps = dispatch => ({
    addTodo:(task)=>dispatch(addTodo(task)),
    returnarry: () => dispatch(returnarry())
})
 
export default connect(mapStateToProps,mapDispatchToProps)(ToDo); 
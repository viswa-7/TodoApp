import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import Modal from "react-native-modal";
import { child } from '@firebase/database';

const ToDo = (props) => {
    const [visbile, setVisible] = useState(false)
    const [toDo, setToDo] = useState('')
    const [DBArray, setDBArray] = useState([])

    useEffect( () => {
        async function fetch() {
            getData()
        }
        fetch()
    }, [])
    
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => console.log('ok'));
            // props.navigation.navigate('SignIn')
        } catch (error) {
            console.error(error);
        }
    };

    const submit = (ToDo) => {
        console.log(ToDo)
        database().ref('ToDoList/').push({
            ToDo
        })
        setVisible(false)
    }

    const getData = () => {
        console.log('vvhvs')

        const DB = database().ref().child('ToDoList')
        database().ref().parent
        DB.on('value', (snapshot) => {
            let data = [];
            snapshot.forEach(child => {
                data.push({
                    todo: child.val().ToDo
                })
            })
            console.log(data)
            setDBArray(data)
        })

    }

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={signOut} style={{   width: '40%', height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 20,alignSelf:'flex-end' }}>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Sign Out</Text>
            </TouchableOpacity>

            <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'center',marginTop:50}}>
                <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>ToDo</Text>
                <Text style={{ color: 'skyblue', fontSize: 20,left:10,fontWeight:'bold' }}>List</Text>
            </View>

            <FlatList
                data={DBArray}
                renderItem={({ item }) => 
                    // return (
                        <View style={{ width: '100%', alignSelf: 'center',backgroundColor:'gainsboro',padding:10,borderWidth:1,marginTop:10 }}>
                            <Text style={{ color: 'black',width:'100%' }}>{item.todo}</Text>
                        </View>
                }
            />

            <TouchableOpacity onPress={() => setVisible(true)} style={{ backgroundColor: 'green', borderRadius: 10, width: '35%', height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 2,marginBottom:50 }}>
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
                        <TextInput onChangeText={(val) => setToDo(val)}  placeholder='Enter ToDo' style={{ backgroundColor: 'white', width: '100%', height: 40, borderWidth: 1, borderRadius: 5, borderColor: 'grey', marginTop: 5 }} />
                    </View>

                    <TouchableOpacity onPress={() => submit(toDo)} style={{ backgroundColor: 'black', borderRadius: 10, width: '35%', height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 2 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default ToDo;
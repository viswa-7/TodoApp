/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import store from './Redux/store';
import { Provider } from 'react-redux';
import {initializeApp} from 'firebase/app'
import * as database from 'firebase/database'
const Stack = createNativeStackNavigator();
import SignIn from './Screens/SignIn';
import ToDo from './Screens/ToDo';

const firebaseConfig = {
  apiKey: "AIzaSyDEVpyQ-xbBmXMSZnjl__CdYxj8yzBRf3Y",
  authDomain: "dbapp-b5810.firebaseapp.com",
  databaseURL: "https://dbapp-b5810-default-rtdb.firebaseio.com",
  projectId: "dbapp-b5810",
  storageBucket: "dbapp-b5810.appspot.com",
  // messagingSenderId: "978402791624",
  // appId: "1:978402791624:web:0cd9c28a5b7cd56d2ed5fd",
  // measurementId: "G-9T2PG9VRS9"
};

if (!firebase.apps.length) {
  initializeApp(firebaseConfig);
}

const App = () => {
  
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  function onAuthStateChanged() {
    if (initializing) setInitializing(false);
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email)
        setUser(user);
      } else {
        setUser(null)
      }
    })
  }

  React.useEffect(() => { 
    onAuthStateChanged()
    
  }, []);

  if (user) {
    console.log('user exists')
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ToDo">
          
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name="ToDo"
            component={ToDo}
          />
        </Stack.Navigator>

        </NavigationContainer>
      </Provider>
    )
  }
  if(!user) {
    console.log('user not exists')
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name="SignIn"
            component={SignIn}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
export default App;

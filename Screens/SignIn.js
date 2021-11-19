import React,{useEffect,useState} from 'react';
import { View, Text, TextInput } from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast'

const SignIn = (props) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);
    
    useEffect(() => {
        GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
            webClientId: '978402791624-o61cuonuevm9kfidkcqou1utndpp2oh4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            
        });

    }, [])
    
    const signIn = async () => {
        console.log('clicked')
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            setloggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
            Toast.show('Logged in successfully!')
            // props.navigation.navigate('ToDo')
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    return (
        <View style={{width:'100%',height:'100%',alignItems:'center',backgroundColor:'pink'}}>
            
            <Text style={{ fontSize: 30,marginTop:20,fontWeight:'bold',color:'black' }}> To Do App </Text>
            
            <View style={{width:'100%',alignItems:'center',justifyContent:'center',height:'50%'}}>
            <View style={{ alignSelf: 'center', width: '70%', }}>
                <Text style={{ alignItems: 'flex-start', fontSize: 18, color: 'black', fontWeight: 'bold'}}>Email</Text>
                <TextInput keyboardType="email-address" placeholder='Enter Email' style={{ backgroundColor: 'white', width: '100%', height: 40, borderWidth: 1, borderRadius: 5, borderColor: 'grey', marginTop: 5, elevation: 2}}/>
            </View>

            <View style={{ alignSelf: 'center', width: '70%', marginTop: 10 }}>
                <Text style={{ alignItems: 'flex-start', fontSize: 18, color: 'black',fontWeight:'bold' }}>Password</Text>
                <TextInput secureTextEntry placeholder='Enter Password' style={{ backgroundColor: 'white', width: '100%', height: 40, borderWidth: 1, borderRadius: 5, borderColor: 'grey', marginTop: 5, elevation: 2 }} />
            </View>

            <View style={{backgroundColor:'#5cd859',borderRadius:10,width:'40%',height:40,alignItems:'center',justifyContent:'center',marginTop:20,elevation:2}}>
                <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>Sign In</Text>
            </View>

            </View>
            <GoogleSigninButton
                style={{ width: 192, height: 48,top:30 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={false}
            />
        </View>
    )
}

export default SignIn
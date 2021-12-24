import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//import Home from "./Pages/Home";
//import Azienda from "./Pages/Azienda";
//import Account from "./Pages/account

import { StatusBar } from 'expo-status-bar';
import { ActionBarImage, StyleSheet, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackRouter } from 'react-navigation';


import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import login from "./login";
import registrazione from "./registrazione";
import AggiungiProdotto from "./aggiungiProdotto.js";
import Account from "./account";
import { decode, encode } from 'base-64'
import { firebase } from '../react-native-firebase/config'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

/*function CartIcon() {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("Account");
  }

  return (
    <TouchableOpacity onPress={navigateToCart}>
      <Feather name={'Account'}/>
    </Touchable,..-òOpacity>
  );
}*/



export default function App({ navigation }) {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);


  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="account">
            {props => <Account {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="Aggiungi prodotto">
            {props => <AggiungiProdotto {...props} extraData={user} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="registrazione" component={registrazione} />
        </>
      )}
    </Stack.Navigator>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  }
});

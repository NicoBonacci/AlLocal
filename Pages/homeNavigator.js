import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./Home";
import Azienda from "./Azienda";
import Product from "./Product";
import Recensione from "./recensione";
import Prenota from "./prenota";

import login from "./login";
import Login from "./login";
import registrazione from "./registrazione";
import Registrazione from "./registrazione";

import { StatusBar } from 'expo-status-bar';
import { ActionBarImage, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackRouter } from 'react-navigation';


import { firebase } from '../react-native-firebase/config';
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

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
      <Stack.Screen name=" " component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Azienda" component={Azienda} />
  
      <Stack.Screen name="Product" component={Product} />


      {/*MI FA ACCEDERE A RECENSIONE O PRENOTA SOLO SE UTENTE HA FATTO IL LOGIN ALTRIMENTI NON SI PUO 
      PER DEVO FARE IN MODO CHE MI REINDIRIZZI ALLA PAGINA SE UTENTE NON è COLLEGATO INVECE CHE QUESTO*/}

      {user ? (
        <Stack.Screen name="Recensione">
          {props => <Recensione {...props} extraData={user} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="registratione" component={registrazione} />
        </>
      )}

      {user ? (
        <Stack.Screen name="Prenota">
          {props => <Prenota {...props} extraData={user} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registrazione" component={Registrazione} />
        </>
      )}


      {/*<Stack.Screen name="Recensione" component={Recensione} />
      <Stack.Screen name="Prenota" component={Prenota} />*/}


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

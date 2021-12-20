import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./Pages/homeNavigator";
import Account from "./Pages/profilenavigator";

import { StatusBar } from 'expo-status-bar';
import { ActionBarImage, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackRouter } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { firebase } from "./react-native-firebase/config";
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


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
    <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                      iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                  } else if (route.name === 'Account') {
                      iconName = focused ? 'ios-list' : 'ios-list-outline'
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray'
          })}
          >
        {user ? (
          <Tab.Screen name="Home" >
            {props => <Home {...props} extraData={user} />}
          </Tab.Screen>
        ) : (
          <>
            <Tab.Screen name="Home" component={Home} />
          </>
        )}

        {user ? (
          <Tab.Screen name="Account" >
            {props => <Account {...props} extraData={user} />}
           
          </Tab.Screen>
        ) : (
          <>
            <Tab.Screen name="Account" component={Account} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
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

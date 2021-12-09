import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./Pages/homeNavigator";
import Account from "./Pages/profilenavigator";

import { StatusBar } from 'expo-status-bar';
import { ActionBarImage, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackRouter } from 'react-navigation';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
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

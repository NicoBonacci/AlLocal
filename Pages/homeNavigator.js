import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./Home";
import Azienda from "./Azienda";
import Product from "./Product";
import Recensione from "./recensione";
import Prenota from "./prenota";

//import Home from "./Pages/Home";
//import Azienda from "./Pages/Azienda";
///import Account from "./Pages/account";
//import Product from "./Pages/Product";
//import Recensione from "./Pages/recensione";
//import Prenota from "./Pages/prenota";
import { StatusBar } from 'expo-status-bar';
import { ActionBarImage ,StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackRouter } from 'react-navigation';
//import { Feather } from 'react-native-feather';

const Stack = createStackNavigator();

/*function CartIcon() {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("Account");
  }

  return (
    <TouchableOpacity onPress={navigateToCart}>
      <Feather name={'Account'}/>
    </TouchableOpacity>
  );
}*/

export default function App({navigation}) {

  return (
      <Stack.Navigator>
        <Stack.Screen name=" " component={Home} /*options={({route, navigation}) => ({
    headerRight: (props) => <CartIcon {...props} navigation={navigation} />,
    title: 'Shop',
    headerStyle: {
      backgroundColor: 'black',
    },
  })}*//>
        <Stack.Screen name="Company" component={Azienda}/>
        {/*<Stack.Screen name="Account" component={Account}/>*/}
        <Stack.Screen name="Product" component={Product}/>
          <Stack.Screen name="Review" component={Recensione}/>
        <Stack.Screen name="Reserve" component={Prenota}/>
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
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  }
});

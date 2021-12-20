import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { getDatabase, ref, onValue, set } from 'firebase/database';



import { firebase } from '../react-native-firebase/config';
import { doc, waitForPendingWrites } from 'firebase/firestore';

export default function App({ navigation }) {

  const [post, setPost] = useState('');
  const currentUser = firebase.auth().currentUser;

  const [update, setUpdate] = useState(false);


  const storingRecensione = () => {
    try {
      const pid = firebase.firestore().collection("recensioni").doc().id;
      const db = firebase.firestore();
      db.collection("recensioni")
        .doc(pid)
        .set({
          Postid: pid,
          UserId: currentUser.uid,
          Post: post,
          prodottoId: null,
          voto: null,
        })
        .then(() => {
          Alert.alert('post inserito!');
        })
      setPost('');
    } catch (err) {
      Alert.alert("there is something waitForPendingWrites", err.messsage);
    }
  }



  return (
    <View style={styles.container}>

      <View>
        <TextInput
          style={styles.input}
          placeholder='Recensione'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPost(text)}
          //value={text}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => storingRecensione()}>
          <Text style={styles.buttonTitle}>store</Text>
        </TouchableOpacity>


      </View>


    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  title: {

  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});
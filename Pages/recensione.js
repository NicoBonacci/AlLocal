import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, } from 'react-native';

import { getDatabase, ref, onValue, set } from 'firebase/database';



import { firebase } from '../react-native-firebase/config';
import { doc, waitForPendingWrites } from 'firebase/firestore';
import { Slider } from 'react-native-elements';

export default function App({ navigation, route }) {

  const [post, setPost] = useState('');
  const currentUser = firebase.auth().currentUser;

  const [update, setUpdate] = useState(false);
  const [valutazione, setValutazione] = useState('0');

  const prodId = route.params.prodottoId;


  const storingRecensione = () => {


    firebase.firestore().collection('users')
      .where('id', '==', currentUser.uid)
      .get().then((userDownloaded) => {

        userDownloaded
          .docs
          .forEach(doc => {
            try {
              const pid = firebase.firestore().collection("recensioni").doc().id;
              const db = firebase.firestore();
              db.collection("recensioni")
                .doc(pid)
                .set({
                  Postid: pid,
                  UserId: currentUser.uid,
                  Post: post,
                  prodottoId: prodId,
                  fullName: doc._delegate._document.data.value.mapValue.fields.fullName.stringValue,
                  voto: parseInt(valutazione),
                })
                .then(() => {
                    Alert.alert('Post inserted!');
                })
              setPost('');
            } catch (err) {
              Alert.alert("there is something waitForPendingWrites", err.messsage);
            }



          });

      });


  }



  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>Write a review:</Text>
        <TextInput
          style={styles.input}
          placeholder='Review'
          placeholderTextColor="#aaaaaa"
          multiline
          numberOfLines={5}
          onChangeText={(text) => setPost(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text style={styles.title}>Evaluation:</Text>
        <Slider
          style={{ width: 300, marginLeft: 40, marginRight: 25 }}
          minimumValue={0}
          maximumValue={5}
          initialValue={0}
          thumbTintColor='#D95D39'
          maximumTrackTintColor='#000'
          minimumTrackTintColor='#000'
          //onSlidingStart
          //onSlidingComplete
          tapToSeek = 'false'
          onValueChange={(value) => parseInt(setValutazione(value))}
        />
        <Text style={styles.title}>{ parseInt(valutazione)}</Text>
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
    backgroundColor: '#C6EBBE',
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: '2%'
  },
  title: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
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
    backgroundColor: '#D95D39',
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
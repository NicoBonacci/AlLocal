import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { getDatabase, ref, onValue, set } from 'firebase/database';

import { firebase } from '../react-native-firebase/config';
import { doc, waitForPendingWrites } from 'firebase/firestore';



export default function App({ navigation }) {

    const [descrizione, setDescrizione] = useState('');
    const [immagine, setImmagine] = useState('');
    const [nomeProdotto, setNomeProdotto] = useState('');
    const [prezzo, setPrezzo] = useState('');
    const [voti, setVoti] = useState('');

    const currentUser = firebase.auth().currentUser;

    const storingProdotto = () => {
        try {
            const pid = firebase.firestore().collection("prodotti").doc().id;
            const db = firebase.firestore();
            db.collection("prodotti")
                .doc(pid)
                .set({
                    Prodottoid: pid,
                    AziendaId: currentUser.uid,
                    Descrizione: descrizione,
                    Nome: nomeProdotto,
                    MediaVoto: null,
                    Prezzo: parseInt(prezzo),
                    Foto: null,
                })
                .then(() => {
                    Alert.alert('prodotto inserito !');
                })
            setDescrizione('');
            setNomeProdotto('');
            setPrezzo('');
            setImmagine('');
            setPrezzo('');
        } catch (err) {
            Alert.alert("there is something go wrong", err.messsage);
        }
    }
    useEffect(() => {
        setDescrizione('');
        setNomeProdotto('');
        setPrezzo('');
        setImmagine('');
        setPrezzo('');
    }, [])


    return (
        <View style={styles.container}>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder='nome del prodotto'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setNomeProdotto(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder='descrizione'
                    placeholderTextColor="#aaaaaa"
                    maxLength="150"
                    onChangeText={(text) => setDescrizione(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder='prezzo'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(number) => parseInt(setPrezzo(number))}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>

            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => storingProdotto()}>
                    <Text style={styles.buttonTitle}>store the product</Text>
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
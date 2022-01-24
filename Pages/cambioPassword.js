import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, } from 'react-native';

import { getDatabase, ref, onValue, set } from 'firebase/database';



import { firebase } from '../react-native-firebase/config';
import { doc, waitForPendingWrites } from 'firebase/firestore';
import { Slider } from 'react-native-elements';
import { getAuth, updatePassword } from 'firebase/auth';

export default function App({ navigation, route }) {

    const [password, setPassword] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    
    const onChangePasswordPress = () => {
        updatePassword(user, password).then(() => {
            alert("Your password has been updated");
            console.log("Cambiata password in %s", password)
        }).catch((error) => {
            alert(error)
        });

    }

    return (
        <View style={styles.container}>

            <View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Insert new password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

            </View>


            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onChangePasswordPress()}>
                    <Text style={styles.buttonTitle}>Cambia password</Text>
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
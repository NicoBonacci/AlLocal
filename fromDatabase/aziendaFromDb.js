import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { firebase } from '../react-native-firebase/config';

import { getAuth, updatePassword } from "firebase/auth";
import { doc } from 'firebase/firestore';

import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



export default function ProdottiFromDb() {

    const auth = getAuth();
    const User = auth.currentUser;

    const [caricato, setCaricato] = useState(false);

    const [aziende, setAziende] = useState([])
    const [newPost, setNewPost] = useState(null);
    const [edit,setEdit] = useState(false);

    const editValue = null;

    const fetchProdotti = async () => {

        const list = [];

        const response = firebase.firestore().collection('users');
        const data = await response.get();
        data.docs.forEach(item => {
            list.push(item.data());
        })
        setAziende(list);
        setCaricato(true);
    }

    useEffect(() => {
        fetchProdotti();
    }, [])

    useEffect(() => {
        fetchProdotti();
        setCaricato(false);
    }, [caricato])

    useEffect(() => {
        fetchProdotti();
        setEdit(false);
    }, [edit])

    const value = null;

    return (

        <View style={styles.containerRow}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.containerNew} >
                    {
                        aziende && aziende.map(azienda => {
                            if (User.uid == azienda.id) {
                                return (
                                    <View style={styles.containerBio}>
                                        <View style={styles.imageRow} >
                                            <Image source={{ uri: azienda.responseImage }}
                                                style={styles.image}>
                                            </Image>
                                            <ScrollView>
                                                <Text style={styles.prodottoText}>
                                                    {azienda.companyDescription}
                                                </Text>
                                            </ScrollView>
                                        </View>


                                    </View>

                                )
                            }

                        })
                    }
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRec: {
        flex: 1,
        width: 350,
        height: 150,
        backgroundColor: "#E6E6E6",
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10

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
    imageRow: {
        flex: 1,
        flexDirection: 'row',
    },
    prodottoText: {
        color: '#121212',
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        width: 90,
        height: 97
    },
    containerBio: {
        flex: 2.5,
        backgroundColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    containerNew: {
        marginBottom: 15,
        marginTop: 5
    }
})

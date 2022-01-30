import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';

import { firebase } from '../react-native-firebase/config';

import { getAuth, updatePassword } from "firebase/auth";


const recFromDb = require('./recensioniFromDbMessage');

function recensioniFromDb() {
    const auth = getAuth();
    const User = auth.currentUser;

    const [deleted, setDeleted] = useState(false);
    const [edit, setEdit] = useState(false);
    const [caricato, setCaricato] = useState(false);

    const [recensioni, setRecensioni] = useState([])
    const [newPost, setNewPost] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const editValue = null;

    const editRecensione = (editValue) => {

        if (recFromDb.checkForm(newPost, setErrorMessage)) {
            try {
                const db = firebase.firestore();
                db.collection('recensioni')
                    .doc(editValue)
                    .update({
                        Post: newPost,
                    })
                    .then(() => {
                        Alert.alert('post updated !');
                    })

                setEdit(true);
                setNewPost('');
            }
            catch (e) {
                Alert.alert('something went wrong', e.message);
            }
        }else{
            Alert.alert(errorMessage);
        }

    }



    const fetchRecensioni = async () => {

        const list = [];

        const response = firebase.firestore().collection('recensioni');
        const data = await response.get();
        data.docs.forEach(item => {
            list.push(item.data());

        })
        setRecensioni(list);
        setCaricato(true);
    }

    useEffect(() => {
        fetchRecensioni();
    }, [])

    useEffect(() => {
        fetchRecensioni();
        setCaricato(false);
    }, [caricato])


    useEffect(() => {
        fetchRecensioni();
        setDeleted(false);
    }, [deleted])

    useEffect(() => {
        fetchRecensioni();
        setEdit(false);
    }, [edit])

    const value = null;
    const deleteRecensione = (value) => {
        try {
            const db = firebase.firestore();
            db.collection('recensioni')
                .doc(value)
                .delete()
                .then(() => {
                    Alert.alert('post deleted !');
                })

            setDeleted(true);
        }
        catch (e) {
            Alert.alert('something went wrong', e.message);
        }
    }

    return (

        <View style={styles.containerRow}>
            <SafeAreaView>
                <ScrollView>
                    {
                        recensioni && recensioni.map(recensione => {
                            if (User.uid == recensione.UserId) {
                                return (
                                    <View>
                                        <View style={styles.containerRec}>
                                            <Text style={styles.recPost}>{recensione.Post}</Text>

                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='modify review'
                                                placeholderTextColor="#aaaaaa"
                                                multiline
                                                numberOfLines={5}
                                                onChangeText={(text) => setNewPost(text)}
                                                value={newPost}
                                                underlineColorAndroid="transparent"
                                                autoCapitalize="none"
                                            />
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => editRecensione(recensione.Postid)}>
                                                <Text style={styles.buttonTitle}>Edit</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.footer}>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => deleteRecensione(recensione.Postid)}>
                                                <Text style={styles.buttonTitle}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )
                            }

                        })
                    }

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
        backgroundColor: '#F4F6F6',
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 5,
    },
    recPost: {
        color: '#000',
        fontSize: 15,
        margin: '5%',
        textAlign: 'center'

    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#F4F6F6',
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
    footer: {
        marginBottom: '5%'
    }
})

export default recensioniFromDb;
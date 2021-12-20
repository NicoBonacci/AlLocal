import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView, Alert } from 'react-native';

import { firebase } from '../react-native-firebase/config';

import { getAuth, updatePassword } from "firebase/auth";




function recensioniFromDb() {
    const auth = getAuth();
    const User = auth.currentUser;

    const [deleted, setDeleted] = useState(false);
    const [edit, setEdit] = useState(false);
    const [caricato, setCaricato] = useState(false);

    const [recensioni, setRecensioni] = useState([])
    const [newPost, setNewPost] = useState(null);

    const editValue = null;
    const editRecensione = (editValue) => {
        try {
            const db = firebase.firestore();
            db.collection('recensioni')
                .doc(editValue)
                .update({
                    Post: newPost,
                })
                .then(() => {
                    Alert.alert('post aggiornato !');
                })

            setEdit(true);
            setNewPost('');
        }
        catch (e) {
            Alert.alert('qualocsa è andato storto', e.message);
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
                    Alert.alert('post cancellato !');
                })

            setDeleted(true);
        }
        catch (e) {
            Alert.alert('qualocsa è andato storto', e.message);
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
                                            <Text>{recensione.Post}</Text>

                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Recensione'
                                                placeholderTextColor="#aaaaaa"
                                                onChangeText={(text) => setNewPost(text)}
                                                value={newPost}
                                                underlineColorAndroid="transparent"
                                                autoCapitalize="none"
                                            />
                                        </View>

                                        <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'green' }}>

                                            <Button title="Edit"
                                                onPress={() => editRecensione(recensione.Postid)}
                                                color="#841584" />
                                        </View>

                                        <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'yellow' }}>
                                            <Button title="X"
                                                onPress={() => deleteRecensione(recensione.Postid)} />
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
})

export default recensioniFromDb;
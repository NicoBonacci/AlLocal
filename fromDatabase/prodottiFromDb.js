import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { firebase } from '../react-native-firebase/config';

import { getAuth, updatePassword } from "firebase/auth";
import { doc } from 'firebase/firestore';

import EditProdotto from '../Pages/editProdotto';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import AziendaFromDb from './aziendaFromDb';



export default function ProdottiFromDb() {
    const auth = getAuth();
    const User = auth.currentUser;
    const navigation = useNavigation();

    const [deleted, setDeleted] = useState(false);
    const [edit, setEdit] = useState(false);
    const [caricato, setCaricato] = useState(false);

    const [prodotti, setProdotti] = useState([])
    const [newPost, setNewPost] = useState(null);

    const editValue = null;

    const fetchProdotti = async () => {

        const list = [];

        const response = firebase.firestore().collection('prodotti');
        const data = await response.get();
        data.docs.forEach(item => {
            list.push(item.data());

        })
        setProdotti(list);
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
        setDeleted(false);
    }, [deleted])

    useEffect(() => {
        fetchProdotti();
        setEdit(false);
    }, [edit])

    const value = null;
    const deleteProdotto = (value) => {
        try {
            const db = firebase.firestore();
            db.collection('prodotti')
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
                        prodotti && prodotti.map(prodotto => {
                            if (User.uid == prodotto.AziendaId) {
                                return (
                                    <View>
                                        <View style={styles.containerRec}>
                                            <View style={styles.imageRow} >
                                                <Image source={{ uri: prodotto.Foto }}
                                                    style={styles.image}>
                                                </Image>
                                                <ScrollView>
                                                    <Text style={styles.prodottoText}>
                                                        {prodotto.Nome}
                                                    </Text>
                                                    <Text style={styles.prodottoText}>
                                                        {prodotto.Descrizione}
                                                    </Text>
                                                    <Text style={styles.prodottoText}>
                                                        {prodotto.Prezzo}€
                                                    </Text>
                                                    <Text style={styles.prodottoText}>
                                                        {prodotto.MediaVoto}
                                                    </Text>

                                                </ScrollView>
                                            </View>
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => deleteProdotto(prodotto.Prodottoid)}>
                                                <Text style={styles.buttonTitle}>X</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => navigation.navigate("Edit Prodotto",
                                                    { desc: prodotto.Descrizione, idProdotto: prodotto.Prodottoid, name: prodotto.Nome, prezzo: prodotto.Prezzo, immagine: prodotto.Foto })}>
                                                <Text style={styles.buttonTitle}>modifica prodotto</Text>
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
        backgroundColor: "#E4F5F7",
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
        margin: '2%',
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
})

import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

import { getDatabase, ref, onValue, set } from 'firebase/database';

import { firebase } from '../react-native-firebase/config';
import { doc, waitForPendingWrites } from 'firebase/firestore';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


import { ScrollView } from 'react-native-gesture-handler';

const editProdMessage = require('./editProdottoMessaggio')

export default function App({ navigation }) {

    const [descrizione, setDescrizione] = useState('');
    const [immagine, setImmagine] = useState('');
    const [nomeProdotto, setNomeProdotto] = useState('');
    const [prezzo, setPrezzo] = useState('');
    const [voti, setVoti] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const cameraRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [urlPhoto, setUrlPhoto] = useState('');

    const [uploading, setUploading] = useState(false);
    const [transfered, setTransfered] = useState(0);



    const currentUser = firebase.auth().currentUser;

    const uploadImage = async () => {
        const uploadUri = image;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const newUri = Platform.OS === 'ios' ? uploadUri.replace('file://', '') : uploadUri;

        setUploading(true);
        setTransfered(0);

        const response = await fetch(newUri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + fileName);

        const snapshot = await ref.put(blob);


        setUploading(false);


        const imgUrl = await snapshot.ref.getDownloadURL();
        setUrlPhoto(imgUrl);

        return imgUrl;

    };
    const takePicture = async () => {
        if (cameraRef) {
            console.log('in take picture');
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                return photo;
            } catch (e) {
                console.log(e);
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            return result;
        }
    };

    /* fine delle funzioni per foto nel db*/


    const saveProdotto = () => {
        if (editProdMessage.checkForm(nomeProdotto, descrizione, prezzo, setErrorMessage)) {
            uploadImage().then((responseImage) => {
                console.log(responseImage);
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
                            Foto: responseImage,
                            imageUrl: urlPhoto
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
            })
        }else{
            Alert.alert(errorMessage);
        }



    }


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
                    Foto: urlPhoto,
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
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Name of product'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setNomeProdotto(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Description'
                        placeholderTextColor="#aaaaaa"
                        multiline
                        numberOfLines={4}
                        onChangeText={(text) => setDescrizione(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Price'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(number) => parseInt(setPrezzo(number))}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

                {/*inizio parte di codice per il caricamneto delle foto*/}

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {useCamera ? (
                        <View>
                            <Camera style={styles.camera} type={type} ref={cameraRef}>
                                <View style={{ flex: 9 }}></View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.buttonInside}
                                        onPress={() => {
                                            setUseCamera(false);
                                        }}>
                                        <Text style={styles.textInside}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonInside}
                                        onPress={() => {
                                            setType(
                                                type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back
                                            );
                                        }}>
                                        <Text style={styles.textInside}>Flip</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonInside]}
                                        onPress={async () => {
                                            console.log('in take pic');
                                            const r = await takePicture();
                                            setUseCamera(false);
                                            if (!r.cancelled) {
                                                setImage(r.uri);
                                            }
                                            console.log('response', JSON.stringify(r));
                                        }}>
                                        <Text style={styles.textInside}>PICTURE</Text>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        </View>
                    ) : (
                        <>
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                        style={[styles.button]}
                                        onPress={async () => {
                                            console.log('in pick photo');
                                            const r = await pickImage();
                                            if (!r.cancelled) {
                                                setImage(r.uri);
                                            }
                                            console.log('response', JSON.stringify(r));
                                        }}>
                                        <Text style={styles.text}> PICK PICTURE </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button]}
                                        onPress={async () => {
                                            console.log('in pick camera');
                                            setUseCamera(true);
                                        }}>
                                        <Text style={styles.text}> PICK CAMERA </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    {true && (
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: 200, height: 200, backgroundColor: 'black' }}
                                        />
                                    )}
                                </View>
                            </View>
                        </>
                    )}
                </View>

                {/*fine codice per caricamento delle foto*/}




                <View>
                    <TouchableOpacity
                        style={styles.buttonStore}
                        onPress={() => saveProdotto()}>
                        <Text style={styles.buttonTitle}>STORE PRODUCT</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#C6EBBE',
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
        backgroundColor: '#F4F6F6',
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
    },
    container: {
        flex: 1,
        backgroundColor: '#C6EBBE',
    },
    camera: {
        flex: 1,
        width: 250,
        height: 250,
        marginTop: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        minWidth: '100%',
        flex: 1,
        paddingBottom: 20
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        margin: 8,
        backgroundColor: '#D95D39',
    },
    buttonStore: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        marginLeft: '13%',
        marginTop: '13%',
        backgroundColor: '#D95D39',
    },

    buttonInside: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#788eec',
    },

    buttonUpload: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 40,
        marginLeft: '12%',
        marginTop: 10,
        backgroundColor: '#788eec',

    },

    textInside: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },

    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
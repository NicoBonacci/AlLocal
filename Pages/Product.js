import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';


import { firebase } from '../react-native-firebase/config';




export default function App({ navigation, route }) {

    const currentUser = firebase.auth().currentUser;
    const prodId = route.params.id;


    const [allReview, setAllReview] = useState([]);
    const [downloadReview, setDownloadReview] = useState(false);
    var [valueRec, setValueRec] = useState(0);
    var [numRec, setNumRec] = useState(0);

    const fetchProdotti = async () => {
        firebase.firestore().collection('recensioni')
            .where('prodottoId', '==', prodId)
            .get()
            .then(snapshot => {
                const review = [];

                snapshot
                    .docs
                    .forEach(doc => {
                        review.push({
                            nome: doc._delegate._document.data.value.mapValue.fields.fullName.stringValue,
                            descrizione: doc._delegate._document.data.value.mapValue.fields.Post.stringValue,
                            voto: doc._delegate._document.data.value.mapValue.fields.voto.integerValue,
                        });
                    });
                setAllReview(review);
                setDownloadReview(true);
            });


    }

    useEffect(() => {
        fetchProdotti();
    }, [])

    useEffect(() => {
        fetchProdotti();
        setDownloadReview(false);
        setValue();
    }, [downloadReview])

    const setValue = () => {
        if (valueRec == 0) {
            var numRecProv = parseInt("0")
            var valueRecProv = parseInt("0")
            allReview.forEach(review => {
                numRecProv = numRecProv + 1
                valueRecProv = parseInt(review.voto)  + valueRecProv;


            });
            if (numRecProv != 0) {
                var media = valueRecProv / numRecProv;

                media = Math.round(media * 100) /100

                setValueRec(media);
            }
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerName}>
                <Text style={styles.nameText}>{route.params.nome}</Text>
            </View>

            <View style={styles.containerBio}>
                <View style={styles.imageRow} >
                    <Image source={{ uri: route.params.photo }}
                        style={styles.image}>
                    </Image>
                    <ScrollView>
                        <Text style={styles.prodottoText}>
                            {route.params.descProd}
                        </Text>
                        <Text style={styles.prodottoText}>
                            {"\n"}Average of grade: {valueRec}
                        </Text>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.titolorec}>
                <Text style={styles.titleRecesioni}>Review: </Text>
            </View>

            <View style={styles.containerRecensioni}>

                <View style={styles.containerRow}>
                    <SafeAreaView>
                        <ScrollView horizontal>

                            {allReview ? allReview.map((review) => (

                                <View style={styles.containerRec}>
                                    <Text style={styles.textRecensione}>
                                        {review.nome} {"\n"}{"\n"}{review.descrizione}{"\n"}{"\n"}Valutazione: {review.voto}
                                    </Text>

                                </View>

                            )) : null
                            }

                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>

            <View style={styles.containerButton}>
                {currentUser ?

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => 
                            navigation.navigate('Review', { prodottoId: prodId })
                        }>
                        <Text style={styles.buttonTitle}>Make review</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonTitle}>Make review</Text>
                    </TouchableOpacity>
                }

                {currentUser ?

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Reserve', { nomeProd: route.params.nome, photo: route.params.photo, descProdotto: route.params.descProd, prezzo: route.params.prezzo, mailAz: route.params.emailAz })}>
                        <Text style={styles.buttonTitle}>Reserve</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonTitle}>Reserve</Text>
                    </TouchableOpacity>

                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6EBBE',
        //alignItems: 'center',
        //justifyContent: 'center',
        padding: '3%',
    },
    containerName: {
        flex: 0.75,
        backgroundColor: '#C6EBBE',
        //borderBottomWidth: 1,
        borderColor: '#000',
    },
    nameText: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
    },
    containerBio: {
        flex: 2.25,
        backgroundColor: '#F4F6F6',
        //borderBottomWidth: 1,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#000',
    },
    imageRow: {
        flex: 1,
        marginLeft: 5,
        marginTop: 5,
        flexDirection: 'row',
    },
    prodottoText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,

    },
    containerRecensioni: {
        flex: 2,
        backgroundColor: '#C6EBBE',
        flexDirection: 'row',
        //borderBottomWidth: 1,
        borderColor: '#000',
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
        marginLeft: 10,
        marginRight: 10
    },
    textRecensione: {
        color: '#000',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center'
    },
    titleRecesioni: {
        color: "#000",
        fontSize: 30,
        marginTop: 15,
        //marginLeft: 8
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    containerButton: {
        flex: 1,
        backgroundColor: '#C6EBBE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '-12%',
    },
    image: {
        width: '38%',
        height: '55%'
    },
    titolorec: {
        flex: 0.75,
        backgroundColor: '#C6EBBE',
        marginTop: '0%',
    },
    button: {
        backgroundColor: '#D95D39',
        //marginLeft: 30,
        //marginRight: 30,
        marginTop: 10,
        height: 50,
        width: 140,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },




});
import { StatusBar } from 'expo-status-bar';
import React, {  useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';


import { firebase } from '../react-native-firebase/config';




export default function App({ navigation, route }) {

    const currentUser = firebase.auth().currentUser;
    const prodId = route.params.id;


    const [allReview, setAllReview] = useState([]);
    const [downloadReview, setDownloadReview] = useState(false);

    useEffect(() => {
        if (downloadReview == false) {
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
                });

            setDownloadReview(true);
        }
    });

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
                                        {review.fullName} {"\n"}{"\n"}{review.descrizione}{"\n"}{"\n"}Valutazione: {"\n"}{review.voto}
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
                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'green' }}>
                        <Button title="fai recensione" onPress={() => navigation.navigate('Recensione', { prodottoId: prodId })}
                            color="#841584" />
                    </View>
                    :

                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'green' }}>
                        <Button title="fai recensione" onPress={() => navigation.navigate('login')}
                            color="#841584" />
                    </View>
                }

                {currentUser ?
                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'yellow' }}>
                        <Button title="prenota" onPress={() => navigation.navigate('Prenota', { nomeProd: route.params.nome, photo: route.params.photo, descProdotto: route.params.descProd, prezzo: route.params.prezzo, mailAz: route.params.emailAz })} />
                    </View>
                    :

                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'yellow' }}>
                        <Button title="prenota" onPress={() => navigation.navigate('login')} />
                    </View>

                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        padding: 10,
    },
    containerName: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    nameText: {
        color: '#121212',
        fontSize: 34,
        textAlign: 'center',
    },
    containerBio: {
        flex: 2.5,
        backgroundColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    imageRow: {
        flex: 1,
        marginLeft: 5,
        marginTop: 5,
        flexDirection: 'row',
    },
    prodottoText: {
        color: '#121212',
        fontSize: 20,
        textAlign: 'center',
    },
    containerRecensioni: {
        flex: 2,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
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
        backgroundColor: "#E6E6E6",
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10
    },
    textRecensione: {
        color: '#121212',
        fontSize: 17,
        marginTop: 5,
        textAlign: 'center'
    },
    titleRecesioni: {
        color: "#121212",
        fontSize: 30,
        marginTop: 15,
        //marginLeft: 8
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    containerButton: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 90,
        height: 97
    },
    titolorec: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    }


});
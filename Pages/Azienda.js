import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View,Image } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { firebase } from '../react-native-firebase/config'

export default function App({ navigation, route }) {

    const [allProducts, setAllProducts] = useState([]);
    const [downloadProduct, setDownloadProduct] = useState(false);
    var mailAz = route.params.mail;

    const fetchAzienda = async () => {
        firebase.firestore().collection('prodotti')
            .where('AziendaId', '==', route.params.id)
            .get()
            .then(snapshot => {
                const product = [];

                snapshot
                    .docs
                    .forEach(doc => {
                        product.push({
                            idProd: doc._delegate._document.data.value.mapValue.fields.Prodottoid.stringValue,
                            descrizione: doc._delegate._document.data.value.mapValue.fields.Descrizione.stringValue,
                            urlPhotoProd: doc._delegate._document.data.value.mapValue.fields.Foto.stringValue,
                            nome: doc._delegate._document.data.value.mapValue.fields.Nome.stringValue,
                            prezzo: doc._delegate._document.data.value.mapValue.fields.Prezzo.integerValue,
                        });
                    });
                setAllProducts(product);
                setDownloadProduct(true);
            });


    }

    useEffect(() => {
        fetchAzienda();
    }, [])

    useEffect(() => {
        fetchAzienda();
        setDownloadProduct(false);
    }, [downloadProduct])

    return (

        <View style={styles.container}>
            <View style={styles.rectNomeAzienda}>
                <Text style={styles.nomeAzienda}>{route.params.name}</Text>
            </View>

            <View style={styles.rectdescrizioneAzienda}>
                <ScrollView>
                    <Text style={styles.testoDescrizione}>
                        {route.params.desc}
                    </Text>
                </ScrollView>
            </View>

            <View style={styles.titoloProdotti}>
                <Text style={styles.testoProduct}>Product:</Text>
            </View>



            <View style={styles.rectProdotti}>
                <View style={styles.rectProdottiRow}>
                    <SafeAreaView>
                        <ScrollView horizontal>

                            {allProducts ? allProducts.map((product) => (

                                <TouchableOpacity
                                    style={styles.rectContenutoProdotto}
                                    onPress={() => navigation.navigate('Product', { descProd: product.descrizione, photo: product.urlPhotoProd, nome: product.nome, id: product.idProd, prezzo: product.prezzo, emailAz: mailAz })}>

                                    {/*<Text style={{
                                        color: '#000',
                                        fontSize: 30,
                                        marginTop: '15%',
                                        textAlign: 'center'
                                    }}>
                                        {product.nome}
                                </Text>*/}

                                    <View style={styles.imageRow} >
                                        <Image source={{ uri: product.urlPhotoProd }}
                                            style={styles.image}>
                                        </Image>

                                        <Text style={styles.prodottoText}>
                                            {product.nome}
                                        </Text>
                                    </View>

                                </TouchableOpacity>

                            )) : null
                            }

                        </ScrollView >
                    </SafeAreaView>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#C6EBBE',

    },
    container2: {
        flex: 1,
    },
    rectNomeAzienda: {
        flex: 0.75,
        //width: 309,
        //height: 68,
        //borderWidth: 0,
        borderColor: '#000',
        //borderStyle: "solid",
        //overflow: "hidden",
        //backgroundColor: "#fff",
        //marginTop: 83,
        //marginLeft: 34
    },
    nomeAzienda: {
        color: "#000",
        fontSize: 30,
        textAlign: "center",
        //marginTop: 10,
        //marginBottom: 10
        //marginLeft: 32
    },
    rectdescrizioneAzienda: {
        flex: 2.5,
        //width: 309,
        //height: 216,
        backgroundColor: '#F4F6F6',
        //marginTop: 28,
        //marginLeft: 34
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#000'
    },
    testoDescrizione: {
        color: "#000",
        fontSize: 20,
        marginTop: '3%',
        marginLeft: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
        marginRight: '3%',

    },
    testoProduct: {
        color: "#000",
        fontSize: 30,
        marginTop: 15,
        //marginLeft: 8
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    titoloProdotti: {
        flex: 0.75,
        backgroundColor: '#C6EBBE',
        marginTop: '0%',
    },
    rectProdotti: {
        flex: 2.25,
        //width: 309,
        //height: 200,
        backgroundColor: '#C6EBBE',
        flexDirection: "row",
        //marginTop: 37,
        //marginLeft: 33
        //borderTopWidth: 2
    },
    rectContenutoProdotto: {
        flex: 1,
        width: 350,
        height: 150,
        backgroundColor: '#F4F6F6',
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        //alignItems: 'center',
        //paddingTop:'20%'
        //textAlign: 'center'
    },
    rectProdottiRow: {
        //height: 64,
        flexDirection: "row",
        flex: 1,
        //marginRight: 45,
        //marginLeft: 27,
        //marginTop: "25%",
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: '38%',
        height: '55%'
    },
    imageRow: {
        flex: 1,
        marginLeft: 0,
        marginTop: '10%',
        marginLeft: '5%',
        flexDirection: 'row',

    },
    prodottoText: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        marginLeft: '5%',
    },
});

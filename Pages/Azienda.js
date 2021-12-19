import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.rectNomeAzienda}>
                <Text style={styles.nomeAzienda}>Miele Mio</Text>
            </View>

            <View style={styles.rectdescrizioneAzienda}>
                <ScrollView>
                    <Text style={styles.testoDescrizione}>
                        L’Azienda Miele mio nasce nel 2010 da una brillante intuizione di Gianfranco che, apprezzando le potenzialità della zona e la propensione della propria famiglia nello sviluppare un’attività per la valorizzazione del territorio, propone di dar vita a un progetto agricolo.
                        {"\n"}{"\n"}
                        Grazie alle grandi passioni per l’apicoltura del figlio Andrea e per la coltivazione delle erbe officinali della moglie Maria Luisa, nasce l’Azienda Agricola Miele Mio dedicata alla produzione miele.
                        {"\n"}{"\n"}L’Azienda è nata dall’unione di due elementi: l’amore per la natura e la passione per l’apicoltura; infatti, Andrea, nonostante un’avviata carriera di architetto, decide di ritornare alla terra e di investire tutto nell’azienda agricola, rincorrendo così il suo sogno di vivere e lavorare a contatto con la natura e col mondo meraviglioso delle api.
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

                            <TouchableOpacity
                                style={styles.rectContenutoProdotto}
                                onPress={() => navigation.navigate('Product')}>

                                <Text style={{ marginRight: 5, marginLeft: 5, marginBottom: 5, fontSize: 30 }}>
                                    {"\n"}{"\n"}                 Miele Bio
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.rectContenutoProdotto}
                                onPress={() => navigation.navigate('Product')}>

                                <Text style={{ marginRight: 5, marginLeft: 5, marginBottom: 5, fontSize: 30 }}>
                                    {"\n"}{"\n"}        Caramelle al Miele
                                        </Text>

                            </TouchableOpacity>


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
        padding: 10,
        backgroundColor: "#fff"

    },
    container2: {
        flex: 1,
    },
    rectNomeAzienda: {
        flex: 1,
        //width: 309,
        //height: 68,
        borderWidth: 0,
        borderColor: "rgba(0,0,0,0.63)",
        borderStyle: "solid",
        overflow: "hidden",
        backgroundColor: "#fff",
        //marginTop: 83,
        //marginLeft: 34
    },
    nomeAzienda: {
        color: "#121212",
        fontSize: 34,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
        //marginLeft: 32
    },
    rectdescrizioneAzienda: {
        flex: 2.5,
        //width: 309,
        //height: 216,
        backgroundColor: "#E6E6E6",
        //marginTop: 28,
        //marginLeft: 34
        borderWidth: 2,


    },
    testoDescrizione: {
        color: "#121212",
        fontSize: 15,
        marginTop: 10,
        //marginLeft: 8
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    testoProduct: {
        color: "#121212",
        fontSize: 30,
        marginTop: 15,
        //marginLeft: 8
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    titoloProdotti:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    rectProdotti: {
        flex: 3.5,
        //width: 309,
        //height: 200,
        backgroundColor: "#fff",
        flexDirection: "row",
        //marginTop: 37,
        //marginLeft: 33
        borderTopWidth: 2
    },
    rectContenutoProdotto: {
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
    rectProdottiRow: {
        //height: 64,
        flexDirection: "row",
        flex: 1,
        //marginRight: 45,
        //marginLeft: 27,
        //marginTop: "25%",
        alignItems: 'center',
        justifyContent: 'center',

    }
});

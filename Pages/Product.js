import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import Azienda from './Azienda';



export default function App({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.containerName}>
                <Text style={styles.nameText}>Caramelle al miele</Text>
            </View>

            <View style={styles.containerBio}>
                <View style={styles.imageRow} >
                    <Image source={require('../assets/caramelle.png')}
                        style={styles.image}>

                    </Image>
                    <ScrollView>
                        <Text style={styles.prodottoText}>
                            Le nostre caramelle al miele contengono i seguenti ingredienti
                            {"\n"}{"\n"}
                            Ingredienti: zucchero, sciroppo di glucosio, miele 10%
                            {"\n"}{"\n"}
                            Possibili tracce di sesamo.
                            {"\n"}{"\n"}
                            Senza glutine
                            {"\n"}{"\n"}
                            voto: 4,00
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
                            <View style={styles.containerRec}>
                                <Text style={styles.textRecensione}>
                                    Mario Rossi {"\n"}{"\n"}Queste caramelle mi sono piaciute molto!{"\n"}{"\n"}Valutazione: {"\n"}4/5
                                </Text>

                            </View>

                            <View style={styles.containerRec}>
                                <Text style={styles.textRecensione}>
                                    Luigi Bianchi {"\n"}{"\n"}Buone, ma ne ho mangiate delle più buone{"\n"}{"\n"}Valutazione: {"\n"}3/5
                                </Text>

                            </View>

                            <View style={styles.containerRec}>
                                <Text style={styles.textRecensione}>
                                    Maria Neri {"\n"}{"\n"}Le ricomprerò{"\n"}{"\n"}Valutazione: {"\n"}5/5
                                 </Text>

                            </View>


                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>

            <View style={styles.containerButton}>
                <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor:'lime' }}>
                    <Button title="Do a review" onPress={() => navigation.navigate('Review')}
                    color="#841584"/>
                </View>

                <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'yellow' }}>
                    <Button title="Reserve" onPress={() => navigation.navigate('Reserve')}/>
                </View>

                
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
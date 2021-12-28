import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView } from 'react-native';

import logo from '../assets/AllLocal_logo.png';
import home from '../assets/HomeLogo.png';

import { firebase } from '../react-native-firebase/config';

import recensione from '../fromDatabase/recensioniFromDb';


import { getAuth, updatePassword } from "firebase/auth";
import { QuerySnapshot } from 'firebase/firestore';

import RecensioniFromDb from '../fromDatabase/recensioniFromDb';
import ProdottiFromDb from '../fromDatabase/prodottiFromDb';
import AziendaFromDb from '../fromDatabase/aziendaFromDb';

import recensioniFromDb, * as recensioni from '../fromDatabase/recensioniFromDb';

export default function Account(props) {
    const [oneChange, setOneChange] = useState(false);

    //Prodotti se azienda recensioni se utente
    const [varNameList, setVarNameList] = useState('Recensioni');
    const [password, setPassword] = useState('');
    const [isuser, setIsUser] = useState(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (props.extraData.isCompany == 'Yes' && oneChange == false) {
        setOneChange(true);
        setVarNameList('Prodotti');
        setIsUser(false);
    }
    const onChangePasswordPress = () => {
        updatePassword(user, password).then(() => {
            alert("Your password has been updated");
            console.log("Cambiata password in %s", password)
        }).catch((error) => {
            alert(error)
        });

    }

    return (

        <SafeAreaView style={styles.container_main}>
            <View style={styles.main_up}>
                <View style={styles.up_logo}>
                    <Image style={{ width: '31%', height: '100%' }}
                        source={logo} />
                </View>
                <View style={styles.up_home}>
                    <Image style={{ width: '31%', height: '100%' }}
                        source={home} />
                </View>
            </View>
            <View style={styles.main_center}>
                <View style={styles.center_name}>
                    <Text style={{ fontSize: 15 }}>Hi {props.extraData.fullName}</Text>
                </View>
                <View style={styles.center_changePassword}>

                    <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10, marginTop: 10 }}>Change your password!</Text>

                    <View style={styles.center_changePasswordBox}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Insert new password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Button title="Change password" onPress={() => onChangePasswordPress()} />
                    </View>

                </View>
            </View>

            {isuser ?
                <>
                    <View style={styles.titolorec}>

                        <Text style={styles.textRecensione}>{varNameList}:</Text>
                    </View>
                    <View style={styles.containerRecensioni}>
                        <RecensioniFromDb />
                    </View>
                </>

                : // condizione di if elese per presentazione della lista tra utente e azienda 

                <>
                    <View style={styles.titolorec}>
                        <Text style={styles.textRecensione}>{varNameList}:</Text>

                    </View>
                    <AziendaFromDb />


                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'green' }}>
                        <Button title="aggiungi un prodotto" onPress={() => props.navigation.navigate("Aggiungi prodotto")} />
                        
                    </View>
                    <View style={{ borderRadius: 5, borderWidth: 2, height: 45, textAlign: 'center', marginTop: 10, backgroundColor: 'green' }}>
                        <Button title="modifica biografia azienda"
                        onPress={() => props.navigation.navigate("Modifica biografia")} 
                        />
                    </View>


                    <View style={styles.containerRecensioni}>
                        <ProdottiFromDb />
                    </View>

                </>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container_main: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        padding: 20,
    },
    main_up: {
        width: '100%',
        height: '7%',
        flexDirection: 'row'
    },
    up_logo: {
        flex: 1,
        width: '50%',
        height: '100%',
        paddingLeft: 30,
    },
    up_home: {
        flex: 1,
        width: '50%',
        height: '100%',
        flexDirection: 'row-reverse',
        paddingLeft: 20,
    },
    main_center: {
        width: '100%',
        height: '23%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_name: {
        width: '95%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_changePassword: {
        width: '95%',
        height: '75%',
    },
    center_changePasswordBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    main_down: {
        width: '100%',
        height: '70%',
        padding: 20,
    },
    down_Text: {
        width: '70%',
        height: '8%',
    },
    TextRev_Prod: {
        width: '70%',
        height: '100%',
        padding: 5,
    },
    Down_prod_rec: {
        width: '100%',
        height: '92%',
    },
    down_Container_prod_rec: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        padding: 5,
    },
    input: {
        height: '100%',
        width: '45%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 15,
        paddingLeft: 16
    },
    containerRecensioni: {
        flex: 2.5,
        width: "100%",
        height: "100%",
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
    rectdescrizioneAzienda: {
        flex: 1.5,
        backgroundColor: "#E6E6E6",
        borderWidth: 2,
    },
    testoDescrizione: {

        color: "#121212",
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    textRecensione: {
        alignItems: 'center',
        fontSize: 20,
        textAlign: "center",
    }
});
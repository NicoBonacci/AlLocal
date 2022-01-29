import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';

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
    const [varNameList, setVarNameList] = useState('Review');
    const [password, setPassword] = useState('');
    const [isuser, setIsUser] = useState(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (props.extraData.isCompany == 'Yes' && oneChange == false) {
        setOneChange(true);
        setVarNameList('Product');
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

    const onSignoutPress = () => {
        firebase.auth().signOut()
        .then(console.log('signed out'))
    }


    return (


        <View style={styles.container_main}>
            {/*<View style={styles.main_up}>
                <View style={styles.up_logo}>
                    <Image style={{ width: '31%', height: '100%' }}
                        source={logo} />
                </View>
                <View style={styles.up_home}>
                    <Image style={{ width: '31%', height: '100%' }}
                        source={home} />
                </View>
    </View>*/}

            <View style={styles.main_center}>
                <View style={styles.center_name}>
                    <Text style={styles.nameText}>Hi {props.extraData.fullName}</Text>
                </View>
                <View style={styles.centerButton}>
                
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate("Cambio Password")}>
                        <Text style={styles.buttonTitle}>Change password</Text>
                    </TouchableOpacity>

                </View>

                {isuser ?
                    <>
                        <View style={styles.titolorec}>
                            <Text style={styles.textRecensione}>{varNameList}:</Text>
                        </View>
                    </>
                    : // condizione di if elese per presentazione della lista tra utente e azienda 
                    <>
                        <View style={styles.containerBio}>
                            <AziendaFromDb />
                        </View>

                        <View style={styles.centerButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => props.navigation.navigate("Aggiungi prodotto")}>
                                <Text style={styles.buttonTitle}>Add product</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => props.navigation.navigate("Modifica biografia")}>
                                <Text style={styles.buttonTitle}>Edit biography</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.titolorec}>
                            <Text style={styles.textRecensione}>{varNameList}:</Text>
                        </View>

                    </>
                }

                <View style={styles.main_down}>
                    {isuser ?
                        <>
                            <View style={styles.containerRecensioni}>
                                <RecensioniFromDb />
                            </View>
                        </>
                        : // condizione di if elese per presentazione della lista tra utente e azienda 
                        <>
                            <View style={styles.containerRecensioni}>
                                <ProdottiFromDb />
                            </View>

                        </>
                    }

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container_main: {
        flex: 1,
        alignItems: 'center',
        padding: '3%',
        backgroundColor: '#C6EBBE',
        //marginTop: '3%',
    },
    main_up: {
        //flex: 0.2,
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    up_logo: {
        //flex: 1,
        width: '50%',
        height: '100%',
        paddingLeft: 30,
        marginTop: '2%'
    },
    up_home: {
        //flex: 1,
        width: '50%',
        height: '100%',
        flexDirection: 'row-reverse',
        paddingLeft: 20,
        marginTop: '3%'
    },
    main_center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "3%"
    },
    center_name: {
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6EBBE',
        marginTop: '20%',
    },
    nameText: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
    },
    centerButton: {
        flex: 1,
        backgroundColor: '#C6EBBE',
        flexDirection: 'row',
        marginLeft: '2%'
    },
    titolorec: {
        flex: 0.75,
        backgroundColor: '#C6EBBE',

    },
    textRecensione: {
        color: '#000',
        textAlign: 'center',
        fontSize: 25

    },

    main_down: {
        flex: 2.5,
        backgroundColor: '#C6EBBE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRecensioni: {
        backgroundColor: '#C6EBBE',
    },
    containerBio: {
        flex: 2.0,
        backgroundColor: '#F4F6F6',
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#000',
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






    center_changePassword: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //width: '95%',
        //height: '75%',

    },
    center_changePasswordBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
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
        backgroundColor: '#F4F6F6',
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
        fontWeight: "bold",
        margin: '3%'
    },
    footer: {
        marginBottom: '5%'
    }
});
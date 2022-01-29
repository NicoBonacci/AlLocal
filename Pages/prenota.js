import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Linking  } from 'react-native';
import Azienda from './Azienda';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { firebase } from '../react-native-firebase/config';


export default function Prenota ({ navigation, route })  {

    const [quantita, setquantita] = useState('')
    const [commenti, setCommenti] = useState('')
    var mailAz = route.params.mailAz;

    const sendEmail = () => {
        console.log(route.params.mailAz)
        const link = 'mailto:' + mailAz + '?subject=Prenotazione AlLocal&body=Ordine un quantitativo di: ' + quantita + ' per il prodotto ' + route.params.nomeProd + "\n\n" + commenti;

        Linking.openURL(link);
       
    }

    return (
        <SafeAreaView style={styles.container}>
    
            <View style={styles.main}>
                <View style={styles.title}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>You are ordering: {route.params.nomeProd} </Text>
                </View>

                <View style={styles.up}>
                    <View style={styles.photo}>
                        <View style={styles.photo_Inside} >
                            <Image source={{ uri: route.params.photo }}
                                style={{
                                        width: '90%',
                                        height: '90%' }} >
                            </Image>
                        </View>
                    </View>
                    <View style={styles.desc}>
                        <View style={styles.desc_Inside} >
                            <Text> {route.params.descProdotto} </Text>
                            </View>
                        </View>

                </View>
                <View style={styles.down}>
                    <View style={styles.donw_Inside}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            keyboardType='numeric'
                            placeholder='Insert quantity'
                            onChangeText={(text) => setquantita(text)}
                            value={quantita}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.inputComment}
                            multiline
                            placeholderTextColor="#aaaaaa"
                            placeholder='Do you want to add a comment for the owner? Type here...'
                            onChangeText={(text) => setCommenti(text)}
                            value={commenti}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sendEmail()}>
                            <Text style={styles.buttonTitle}>Send!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
 
        </SafeAreaView >
        );
}


const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'column',
        backgroundColor: '#C6EBBE',
    },
    title: {
        width: '60%',
        height: '10%',
        
    },
    up: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
    },
    photo: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    photo_Inside: {
        width: '80%',
        height: '80%',
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

       
    },
    desc_Inside: {
        width: '75%',
        height: '80%',
       
        justifyContent: 'center',
        alignItems: 'center'
    },
    down: {
        flex: 1,
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    donw_Inside: {
        flex: 1,
        width: '90%',
        height: '80%',
      
},

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
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
        paddingLeft: 16,
        
    },
    inputComment: {
        height: '50%',

        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 5,
    
        
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
        fontWeight: "bold"
    }


});
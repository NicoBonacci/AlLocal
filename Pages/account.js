import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Button } from 'react-native';

import logo from '../assets/AllLocal_logo.png';
import home from '../assets/HomeLogo.png';


import { getAuth, updatePassword } from "firebase/auth";

export default function Account(props) {
    const [oneChange, setOneChange] = useState(false);

    //Prodotti se azienda recensioni se utente
    const [varNameList, setVarNameList] = useState('Recensioni');

    const [password, setPassword] = useState('')


    const auth = getAuth();
    const user = auth.currentUser;



    if (props.extraData.isCompany == 'Yes' && oneChange == false) {
        setOneChange(true)
        setVarNameList('Prodotti')
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

            <View style={styles.main_center}>
                <View style={styles.center_name}>
                    <Text style={{fontSize: 20}}>Hi {props.extraData.fullName}</Text>
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
            <View style={styles.main_down}>
                <View style={styles.down_Text}>
                    <Text>{varNameList}</Text>
                </View>
                <View style={styles.Down_prod_rec}>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Ho comprato questo prodotto piu' d...</Text>
                        </View>
                        <Button title="Edit" />
                        <Button title="X" />
                    </View>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Questo azienda e' sinonimo di qualit..</Text>
                        </View>
                        <Button title="Edit" />
                        <Button title="X" />
                    </View>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Azienda top</Text>
                        </View>
                        <Button title="Edit" />
                        <Button title="X" />
                    </View>
                </View>
            </View>
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
        height: '28%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_name: {
        width: '95%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
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
        height: '72%',
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
});
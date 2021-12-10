import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button } from 'react-native';

import logo from '../assets/AllLocal_logo.png';
import home from '../assets/HomeLogo.png';

import Azienda from './Azienda';

export default function Account(props) {
    const [oneChange, setOneChange] = useState(false);

    //Prodotti se azienda recensioni se utente
    const [varNameList, setVarNameList] = useState('Recensioni');


    if (props.extraData.isCompany == 'Yes' && oneChange == false) {
        setOneChange(true)
        setVarNameList('Prodotti')
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
                    <Text>Hi {props.extraData.fullName}</Text>
                </View>
                <View style={styles.center_changePassword}>
                    <Button title="Change password" />
                </View>
            </View>
            <View style={styles.main_down}>
                <View style={styles.down_Text}>
                    <Text>{varNameList}</Text>
                </View>
                <View style={styles.Down_prod_rec}>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Rec1</Text>
                        </View>
                        <Button title="Edit" />
                        <Button title="X" />
                    </View>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Rec2</Text>
                        </View>
                        <Button title="Edit" />
                        <Button title="X" />
                    </View>
                    <View style={styles.down_Container_prod_rec}>
                        <View style={styles.TextRev_Prod}>
                            <Text>Rec3</Text>
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
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_name: {
        flex: 1,
        width: '95%',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_changePassword: {
        flex: 1,
        width: '95%',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    main_down: {
        width: '100%',
        height: '73%',
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


});
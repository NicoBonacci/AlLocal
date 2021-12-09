import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../react-native-firebase/config'
import account from "./account";
import RadioButtonRN from 'radio-buttons-react-native';

export default function registration({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAdress] = useState('')
    const [isCompany, setIsCompany] = useState('No')
    const [seeAddress, setSeeAddress] = useState(false)

    const valueButton = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    isCompany,
                    address
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Account', { user: data })
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/AllLocal_logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View>
                    <View
                        style={styles.radioButton}>
                        <Text style={{ fontSize: 18 }}>Are you a company?</Text>
                        <View
                            style={styles.radioButtonInside}>
                            <RadioButtonRN
                                data={valueButton}
                                selectedBtn={(value) => {
                                    setIsCompany(value.value);
                                    if (value.value == 'Yes') setSeeAddress(true)
                                    else setSeeAddress(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
                {
                    seeAddress ? <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Address'
                        onChangeText={(text) => setAdress(text)}
                        value={address}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /> : null
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
container: {
    flex: 1,
        alignItems: 'center',
    },
title: {

},
logo: {
    flex: 1,
        height: 120,
            width: 90,
                alignSelf: "center",
                    margin: 30
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
                                    paddingLeft: 16
},
button: {
    backgroundColor: '#788eec',
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
},
radioButton: {
    paddingLeft: '5%',
        paddingTop: '5%',
            paddingRight: '5%'
},
radioButtonInside: {
    paddingLeft: '25%',
        paddingRight: '25%',
    },
footerView: {
    flex: 1,
        alignItems: "center",
            marginTop: 20
},
footerText: {
    fontSize: 16,
        color: '#2e2e2d'
},
footerLink: {
    color: "#788eec",
        fontWeight: "bold",
            fontSize: 16
}
});

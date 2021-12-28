import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../react-native-firebase/config'
import account from "./account";
import RadioButtonRN from 'radio-buttons-react-native';
import PicUpdate from './picUpdate';

import  {  useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function registration({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAdress] = useState('')
    const [addressLatitude, setAdressLatitude] = useState('')
    const [addressLongitude, setAdressLongitude] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')

    const [isCompany, setIsCompany] = useState('No')
    const [seeAddInformation, setSeeAddInformation] = useState(false)



    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const cameraRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [urlPhoto, setUrlPhoto] = useState('');

    const [uploading, setUploading] = useState(false);
    const [transfered, setTransfered] = useState(0);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const uploadImage = async () => {
        const uploadUri = image;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const newUri = Platform.OS === 'ios' ? uploadUri.replace('file://', '') : uploadUri;

        setUploading(true);
        setTransfered(0);


        const response = await fetch(newUri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + fileName);

        const snapshot = await ref.put(blob);

        setUploading(false);

        const imgUrl = await snapshot.ref.getDownloadURL();
        setUrlPhoto(imgUrl);

        return imgUrl;

        setImage(null);

    };

    const takePicture = async () => {
        if (cameraRef) {
            console.log('in take picture');
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                return photo;
            } catch (e) {
                console.log(e);
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            return result;
        }
    };

    var requestOptions = {
        method: 'GET',
    };

    const valueButton = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }


        if (image === null && isCompany == 'Yes') {
            alert("Upload a picture");
        } else {
            if (isCompany == 'Yes') {
                uploadImage().then((responseImage) => {
                    console.log(responseImage);
                    fetch("https://api.geoapify.com/v1/geocode/search?text=" + address + "&apiKey=e5e4640f03c147c58545023a81e1b8e1", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(urlPhoto);
                            return result;
                        })
                        .catch(error => console.log('error', error))
                        .then((responseGeometry) => {
                            var addreLat = responseGeometry.features[0].geometry.coordinates[1];
                            var addreLong = responseGeometry.features[0].geometry.coordinates[0];

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
                                        address,
                                        addreLat,
                                        addreLong,
                                        companyDescription,
                                        responseImage
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


                        }).catch((error) => {
                            alert(error)
                        });
                }).catch((error) => {
                    alert(error)
                });
            } else {

                var addreLat = '';
                var addreLong = '';
                var responseImage = '';
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
                                        address,
                                        addreLat,
                                        addreLong,
                                        companyDescription,
                                        responseImage
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
        }


            
 

       
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
                                    if (value.value == 'Yes') setSeeAddInformation(true)
                                    else setSeeAddInformation(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
                {
                    seeAddInformation ? <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Address'
                        onChangeText={(text) => setAdress(text)}
                        value={address}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /> : null
                }

                {seeAddInformation ? <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Description Company'
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setCompanyDescription(text)}
                    value={companyDescription}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /> : null

                }

                {seeAddInformation ? (<View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {useCamera ? (
                        <View>
                            <Camera style={styles.camera_Pic_Update} type={type} ref={cameraRef}>
                                <View style={{ flex: 9 }}></View>
                                <View style={styles.buttonContainer_Pic_Update}>
                                    <TouchableOpacity
                                        style={styles.buttonInside_Pic_Update}
                                        onPress={() => {
                                            setUseCamera(false);
                                        }}>
                                        <Text style={styles.textInside_Pic_Update}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonInside_Pic_Update}
                                        onPress={() => {
                                            setType(
                                                type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back
                                            );
                                        }}>
                                        <Text style={styles.textInside_Pic_Update}>Flip</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonInside_Pic_Update]}
                                        onPress={async () => {
                                            console.log('in take pic');
                                            const r = await takePicture();
                                            setUseCamera(false);
                                            if (!r.cancelled) {
                                                setImage(r.uri);
                                            }
                                            console.log('response', JSON.stringify(r));
                                        }}>
                                        <Text style={styles.textInside_Pic_Update}>PICTURE</Text>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        </View>
                    ) : (
                        <>
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                            style={[styles.button_Pic_Update]}
                                        onPress={async () => {
                                            console.log('in pick photo');
                                            const r = await pickImage();
                                            if (!r.cancelled) {
                                                setImage(r.uri);
                                            }
                                            console.log('response', JSON.stringify(r));
                                        }}>
                                            <Text style={styles.text_Pic_Update}> PICK PICTURE </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                            style={[styles.button_Pic_Update]}
                                        onPress={async () => {
                                            console.log('in pick camera');
                                            setUseCamera(true);
                                        }}>
                                            <Text style={styles.text_Pic_Update}> PICK CAMERA </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    {true && (
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: 200, height: 200, backgroundColor: 'black' }}
                                        />
                                    )}
                                </View>
                            </View>
                        </>
                    )}
                </View> ) : null

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
        width: 130,
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
    },
     container_Pic_Update: {
        flex: 1,
    },
    camera_Pic_Update: {
        flex: 1,
        width: 250,
        height: 250,
        marginTop: 15
    },
    buttonContainer_Pic_Update: {
        flexDirection: 'row',
        minWidth: '100%',
        flex: 1,
        paddingBottom: 20
    },
    button_Pic_Update: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        margin: 8,
        backgroundColor: '#788eec',
    },

    buttonInside_Pic_Update: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#788eec',
    },

    buttonUpload_Pic_Update: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 40,
        marginLeft: '12%',
        marginTop: 10,
        backgroundColor: '#788eec',

    },

    textInside_Pic_Update: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },

    text_Pic_Update: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { LogBox } from 'react-native';

import { firebase } from '../react-native-firebase/config'


import logo from '../assets/AllLocal_logo.png';
import profile from '../assets/iconProfile.png';
import azienda1 from '../assets/azienda1.png';
import azienda2 from '../assets/dole.png';
import azienda3 from '../assets/mielemio.png';
import azienda4 from '../assets/casaDelleCarta.png';
import locationIcon from '../assets/locationIcon.png';

export default function App({navigation}) {
    //var usata per salvare la posizione ottenuta dal gps del cell
    const [location, setLocation] = useState(null);

    //var che serve per fare il render solo una volta quando ho i dati del gps altrimenti entra in loop perch� continua a salvare i dati del gps in location
    const [locUnavailable, setLocUnavailable] = useState(0);




    //var in cui ho la lat long della posizione della mappa
    const [mapRegion, setmapRegion] = useState({
        latitude: 45.473483092360105,
        longitude: 9.187337635878599,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    //inizialmente false, quando clicco su un azienda viene mostrato in basso i dettagli
    const [showDetails, setShowDetails] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [urlOfImage, setUrlImage] = useState('');

    const [Allmarkets, setAllMarkets] = useState([]);
    //Scarica i dati dal db una volta sola
    const [downloadMarket, setDownloadMarket] = useState(false);

    //ignora il problema AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);

    //ignora il problema each child in a list should... per allMarket.maps quando vado a disegnare i marker in modo iterativo sulla mappa non hanno una key specifica
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);

    //controlla se ho l'accesso per ricevere i dati dal gps
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //imposta la mappa centrata sulla posizione del gps
    if (location && locUnavailable == 0) {
        setmapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })
        setLocUnavailable(1)
    }

    var requestOptions = {
        method: 'GET',
    };

    useEffect(() => {
        if (downloadMarket == false) {
            firebase.firestore().collection('users')
                .get()
                .then(snapshot => {
                    const market = [];
                    snapshot
                        .docs
                        .forEach(doc => {
                            if (doc._delegate._document.data.value.mapValue.fields.isCompany.stringValue == 'Yes') {
                                market.push({
                                    id: doc._delegate._document.data.value.mapValue.fields.id.stringValue,
                                    fullName: doc._delegate._document.data.value.mapValue.fields.fullName.stringValue,
                                    coordination: {
                                        latitude: doc._delegate._document.data.value.mapValue.fields.addressLatitude.doubleValue,
                                        longitude: doc._delegate._document.data.value.mapValue.fields.addressLongitude.doubleValue
                                    }
                                });

                            }
                        });
                    setAllMarkets(market);
                });
            setDownloadMarket(true);
        }
    });
    return (
        <View style={styles.main}>
            <View style={styles.up}>
                <View style={styles.up_logo}>
                    <View style={styles.up_logo_enter}>
                        <Image style={{ width: '100%', height: '100%' }}
                            source={logo}
                        />
                    </View>
                </View>
                <View style={styles.up_search}>
                    <View style={styles.up_search_enter}>
                        {//ottiene la posizione della citta cercata nella barra di ricerca
                        }
                        <TextInput
                            style={styles.searchBar}
                            placeholder={'Search'}
                            placeholderTextColor={'#666'}
                            onSubmitEditing={(event) => {
                                fetch("https://api.geoapify.com/v1/geocode/search?text=" + event.nativeEvent.text + "&apiKey=e5e4640f03c147c58545023a81e1b8e1", requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        setmapRegion({
                                            latitude: result.features[0].geometry.coordinates[1],
                                            longitude: result.features[0].geometry.coordinates[0],
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421
                                        })

                                    })
                                    .catch(error => console.log('error', error));
                            }

                            } />
                    </View>
                </View>

            </ View>
            <View style={styles.center} >


                <MapView loadingEnabled={true}
                    style={styles.mapViewStyle}
                    region={mapRegion}
                    onRegionChangeComplete={(region) => {
                        setmapRegion({
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta
                        })
                    }
                    }>
                    {
                        //carica la posizione del gsp se ho i valori, se ho i val me lo dice locUnavalable
                    }
                    {locUnavailable ?
                        <Marker coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }} title='Your position'
                            onPress={() => { }}
                        ><Image source={locationIcon}
                            style={{ height: 20, width: 20 }} /></Marker> : null
                    }

                    
                    { Allmarkets ? Allmarkets.map((market) => (
                        <Marker coordinate={market.coordination}
                            title={market.fullName}
                            onPress={() => {
                                setShowDetails(true)
                                setCompanyName(market.fullName)
                                setUrlImage(azienda1)
                            }
                            }
                        />

                     )) : null
                    }

                    {//market inseriti manualmente di prova da mettere un ciclo for quando ho i dati nel db
                    }

                    <Marker coordinate={{
                        latitude: 45.49352339375695,
                        longitude: 9.218693011821031,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} title='Fattoria Franco'
                        onPress={() => {
                            setShowDetails(true)
                            setCompanyName('Fattoria Franco')
                            setUrlImage(azienda1)
                        }
                        }
                    />
                    <Marker coordinate={{
                        latitude: 45.4616850392618,
                        longitude: 9.171373124395622,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} title='Dole' onPress={() => {
                        setShowDetails(true)
                        setCompanyName('Dole')
                        setUrlImage(azienda2)

                    }
                    }
                    />
                    <Marker coordinate={{
                        latitude: 45.474205342036015,
                        longitude: 9.147855515051386,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} title='Casa della carta'
                        onPress={() => {
                            setShowDetails(true)
                            setCompanyName('Casa della carta')
                            setUrlImage(azienda4)
                        }
                        }
                    />
                    <Marker coordinate={{
                        latitude: 45.46024020998643,
                        longitude: 9.211026903654878,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} title='Miele mio'
                        onPress={() => {
                            setShowDetails(true)
                            setCompanyName('Miele mio')
                            setUrlImage(azienda3)
                        }
                        }
                    />
                </MapView>

            </View>
            <View style={styles.down}>

                {showDetails ? <TouchableOpacity style={styles.down_company} onPress={() => navigation.navigate('Company')}>
                    <Text style={styles.textCompany}>{companyName}</Text>
                    <Image style={styles.picCompanyDimension} source={urlOfImage}/>
                </TouchableOpacity> : null}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    main: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        padding: 10,
    },
    up: {
        flexDirection: 'row',
        width: '100%',
        height: '15%',
    },
    center: {
        width: '100%',
        height: '50%',
        marginHorizontal: 0,
        flexGrow: 1,
    },
    down: {
        width: '100%',
        height: '30%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    up_logo: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    up_search: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    down_company: {

        width: '90%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA'

    },
    up_logo_enter: {

        width: '100%',
        height: '70%',

    },
    up_search_enter: {

        width: '100%',
        height: '40%',
    },
    searchBar: {
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    mapViewStyle: {
        alignSelf: 'stretch',
        height: '100%'
    },
    textCompany: {
        fontSize: 25,

    },
    picCompanyDimension: {
        marginTop: 15,
        width: '50%',
        height: '50%',
    }
});

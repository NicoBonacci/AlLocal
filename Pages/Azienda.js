import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.rectNomeAzienda}>
                <Text style={styles.nomeAzienda}>NOME AZIENDA</Text>
            </View>

            <View style={styles.rectdescrizioneAzienda}>
                <ScrollView>
                    <Text style={styles.testoDescrizione}>
                        DESCRIOZONE AZIENDA: {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                        {"\n"}wdvsjwiosdvjpowjvpowes{"\n"}wvdjsviojwepovkwepèsd{"\n"}
                        wvdsojvoèweksvpèw7wevksdpovkwepè{"\n"}evwpdksvpwes{"\n"}wevsdpovwepèsd
                        {"\n"}vwekdsoòvkwes{"\n"}wevsdpvkweèseuifbrbvnuvbervubweuvbiwvbwrv
                        {"\n"} jrifhuigherihgihgih3489gij30whgjihjwg092jwefoj2iweogjwpogjw
                        {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                        {"\n"}wdvsjwiosdvjpowjvpowes{"\n"}wvdjsviojwepovkwepèsd{"\n"}
                        wvdsojvoèweksvpèw7wevksdpovkwepè{"\n"}evwpdksvpwes{"\n"}wevsdpovwepèsd
                        {"\n"}vwekdsoòvkwes{"\n"}wevsdpvkweèseuifbrbvnuvbervubweuvbiwvbwrv
                        {"\n"} jrifhuigherihgihgih3489gij30whgjihjwg092jwefoj2iweogjwpogjw
                        {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                        {"\n"}wdvsjwiosdvjpowjvpowes{"\n"}wvdjsviojwepovkwepèsd{"\n"}
                        wvdsojvoèweksvpèw7wevksdpovkwepè{"\n"}evwpdksvpwes{"\n"}wevsdpovwepèsd
                        {"\n"}vwekdsoòvkwes{"\n"}wevsdpvkweèseuifbrbvnuvbervubweuvbiwvbwrv
                        {"\n"} jrifhuigherihgihgih3489gij30whgjihjwg092jwefoj2iweogjwpogjw
                    </Text>
                </ScrollView>
            </View>

            <View style={styles.titoloProdotti}>
                <Text style={styles.testoDescrizione}>Product:</Text>
            </View>



            <View style={styles.rectProdotti}>
                <View style={styles.rectProdottiRow}>
                    <SafeAreaView>
                        <ScrollView horizontal>

                            <TouchableOpacity
                                style={styles.rectContenutoProdotto}
                                onPress={() => navigation.navigate('Product')}>

                                <Text style={{ marginRight: 5, marginLeft: 5, marginBottom: 5 }}>
                                    {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                                    {"\n"}wdvsjwiosdvjpowjvpowes{"\n"}wvdjsviojwepovkwepèsd{"\n"}
                                    wvdsojvoèweksvpèw7wevksdpovkwepè{"\n"}evwpdksvpwes{"\n"}wevsdpovwepèsd
                                    {"\n"}vwekdsoòvkwes{"\n"}wevsdpvkweèseuifbrbvnuvbervubweuvbiwvbwrv
                                    {"\n"} jrifhuigherihgihgih3489gij30whgjihjwg092jwefoj2iweogjwpogjw
                                    {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.rectContenutoProdotto}
                                onPress={() => navigation.navigate('Product')}>

                                        <Text style={{ marginRight: 5, marginLeft: 5, marginBottom: 5 }}>
                                            {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
                                            {"\n"}wdvsjwiosdvjpowjvpowes{"\n"}wvdjsviojwepovkwepèsd{"\n"}
                                            wvdsojvoèweksvpèw7wevksdpovkwepè{"\n"}evwpdksvpwes{"\n"}wevsdpovwepèsd
                                            {"\n"}vwekdsoòvkwes{"\n"}wevsdpvkweèseuifbrbvnuvbervubweuvbiwvbwrv
                                            {"\n"} jrifhuigherihgihgih3489gij30whgjihjwg092jwefoj2iweogjwpogjw
                                            {"\n"}cdskvjiowviowjviewjgiovhwrpovjweiojviwev
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
        fontFamily: "roboto-700italic",
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
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 15,
        marginTop: 10,
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

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { Platform } from 'react-native';
import "firebase/firestore";
import "firebase/storage";



if (Platform.OS === 'ios') {


    const firebaseConfig = {
        apiKey: "AIzaSyAdDMHfjlTriiXTJ1AWonSNacmTrUdtX0w",
        authDomain: "allocal2.firebaseapp.com",
        databaseURL: "https://allocal2.firebaseio.com",
        projectId: "allocal2",
        storageBucket: "allocal2.appspot.com",
        messagingSenderId: "240425908193",
        appId: "1:804473380410:ios:f1765eac8d385ed526df03",
    };
    app = firebase.initializeApp(firebaseConfig);


} else {

    const firebaseConfig = {
        apiKey: "AIzaSyBNmEhhJfpcLIHePMfmvt8g-etv7dB9w5s",
        authDomain: "allocal.firebaseapp.com",
        databaseURL: "https://allocal.firebaseio.com",
        projectId: "allocal",
        storageBucket: "allocal.appspot.com",
        messagingSenderId: "240425908193",
        appId: "1:240425908193:android:638223df073e0dd0f904a0",
    };
    app = firebase.initializeApp(firebaseConfig);

}


export { firebase };
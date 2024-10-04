import { initializeApp } from "firebase/app";

/* Database Baglantisini Aliyoruz */
import { getFirestore } from 'firebase/firestore'

import { getAuth } from 'firebase/auth'

/* Google Online Database Kullanimi Icşn Gereken Baglanti Bilgileri*/
const firebaseConfig = {
    apiKey: "AIzaSyDnl9Wcp08bZfF0-Yt1Mx5BvJttBVNB-ow",
    authDomain: "fir-ff933.firebaseapp.com",
    projectId: "fir-ff933",
    storageBucket: "fir-ff933.appspot.com",
    messagingSenderId: "711514450638",
    appId: "1:711514450638:web:ffe0a81693b05bfea07e9f",
    measurementId: "G-GTM5XT83HM"  
};

initializeApp(firebaseConfig);

const DB = getFirestore();
const AUTH = getAuth();

export { DB, AUTH }

/* Google Firebase Icinde 
    Build Menusu Icinde 
    Authentication Ozelligini Seciyoruz 
    Dogrulama Islemini E-Mail ve Password Olarak Secip Kaydediyoruz */
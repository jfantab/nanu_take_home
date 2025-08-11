// Firebase offers key-value stores, which allows for a flexible schema

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAJgd-CRaI20Wv-iCMcnz4YTUmXTpNpaXo',
    authDomain: 'nanu-a2cc9.firebaseapp.com',
    projectId: 'nanu-a2cc9',
    storageBucket: 'nanu-a2cc9.firebasestorage.app',
    messagingSenderId: '936252532990',
    appId: '1:936252532990:web:a804511cde180032669daf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

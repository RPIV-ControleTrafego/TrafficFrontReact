    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import { getAuth } from "firebase/auth";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyD7ktfs0-Ye9Mq_ILOSfgZCxqedQ4cUGvw",
        authDomain: "trafficcontrol-26919.firebaseapp.com",
        projectId: "trafficcontrol-26919",
        storageBucket: "trafficcontrol-26919.appspot.com",
        messagingSenderId: "394970323531",
        appId: "1:394970323531:web:3ce213a66030117cc54bce",
        measurementId: "G-Z0DPE3DR4Y"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    export const auth = getAuth(app);
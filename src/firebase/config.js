import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGPQi-tdEldqj8OrloZhnGi-P3hrrAKoI",
  authDomain: "plasma-buckeye-452720-h3.firebaseapp.com",
  projectId: "plasma-buckeye-452720-h3",
  storageBucket: "plasma-buckeye-452720-h3.firebasestorage.app",
  messagingSenderId: "983687011805",
  appId: "1:983687011805:web:45c3c1043b2403518b2a34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };
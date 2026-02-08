/* ==========================================
   FIREBASE CONFIGURATION - CampusFind AI
   ========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAT0EOe3jpjYmjNpwhQgynBeW3-pOJy6Bs",
  authDomain: "lost-found-60e9e.firebaseapp.com",
  projectId: "lost-found-60e9e",
  storageBucket: "lost-found-60e9e.appspot.com",
  messagingSenderId: "549965603677",
  appId: "1:549965603677:web:245f2d57a1cf18c13fbeb4",
  measurementId: "G-GM3YCQ504D",
  // Added your specific Database URL for the Asia region
  databaseURL: "https://lost-found-60e9e-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 1. Initialize Firebase 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully!");
}

// 2. Define Global Constants
// These allow your other files (like post-lost.js) to use them directly
const auth = firebase.auth();
const database = firebase.database(); // Now correctly linked to your Asia server
const storage = firebase.storage();

// 3. Export check (Optional - helps for debugging)
console.log("Database URL linked: ", database.ref().toString());
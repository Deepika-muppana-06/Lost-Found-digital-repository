// main.js

// Import Firebase services and auth functions
import app, { db, storage } from "./firebase-config";
import auth, { registerUser, loginUser, logoutUser, onAuthChange } from "./auth";

// Example: Listen for authentication state changes
onAuthChange((user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});

// Example: Register a new user
const signupForm = document.getElementById("signupForm");
signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  registerUser(email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user);
      alert("Registration successful!");
    })
    .catch((error) => {
      console.error(error.message);
      alert("Error: " + error.message);
    });
});

// Example: Login user
const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  loginUser(email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
    })
    .catch((error) => {
      console.error(error.message);
      alert("Error: " + error.message);
    });
});

// Example: Logout user
const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", () => {
  logoutUser()
    .then(() => {
      console.log("User logged out");
      alert("Logged out successfully!");
    })
    .catch((error) => console.error(error.message));
});

// Example: Firestore usage
const addDataButton = document.getElementById("addData");
addDataButton?.addEventListener("click", async () => {
  try {
    const docRef = await db.collection("users").add({
      name: "Deepika",
      email: "deepika@example.com",
      createdAt: new Date()
    });
    console.log("Document written with ID:", docRef.id);
    alert("Data added to Firestore!");
  } catch (error) {
    console.error("Error adding document:", error);
  }
});

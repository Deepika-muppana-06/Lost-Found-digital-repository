window.registerUser = function (email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Registration successful! ✅");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Signup Error: " + error.message);
        });
};

// 2. LOGIN USER
window.loginUser = function (email, password) {
    console.log("Attempting login for:", email); // Check F12 console to see if this is correct
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful! 🎉");
            window.location.href = "index.html"; 
        })
        .catch((error) => {
            console.error("Login Failed:", error.code);
            alert("Error: " + error.message);
        });
};

// 3. LOGOUT USER
window.logoutUser = function () {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
};
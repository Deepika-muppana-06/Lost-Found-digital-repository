/* ==========================================
    POST LOST ITEM - CampusFind AI
   ========================================== */

// 1. Check if user is logged in
/* ==========================================
    POST LOST ITEM - CampusFind AI
   ========================================== */

// 1. Redirect if not logged in




// auth.onAuthStateChanged(user => {
//     if (!user) {
//         alert("You must be logged in to report lost items.");
//         window.location.href = "login.html";
//     }
// });

// const lostForm = document.getElementById("lostForm");
// const submitBtn = document.getElementById("submitBtn");

// if (lostForm) {
//     lostForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const user = auth.currentUser;
//         if (!user) return;

//         // Get form values
//         const title = document.getElementById("title").value.trim();
//         const description = document.getElementById("description").value.trim();
//         const category = document.getElementById("category").value;
//         const location = document.getElementById("location").value.trim();
//         const date = document.getElementById("date").value;
//         const contact = document.getElementById("contact").value.trim();
//         const imageFile = document.getElementById("image").files[0];

//         submitBtn.innerText = "Reporting...";
//         submitBtn.disabled = true;

//         try {
//             let imageUrl = "https://via.placeholder.com/300?text=No+Image+Provided"; 

//             // 2. Attempt Image Upload
//             if (imageFile) {
//                 try {
//                     const fileName = `lost_${Date.now()}_${imageFile.name}`;
//                     const fileRef = storage.ref(`lost-items/${fileName}`);
//                     await fileRef.put(imageFile);
//                     imageUrl = await fileRef.getDownloadURL();
//                 } catch (imgError) {
//                     console.error("Storage Error (likely rules/upgrade):", imgError);
//                     // We continue even if image fails so the text data is saved
//                 }
//             }

//             // 3. Save to Realtime Database
//             const newItemRef = database.ref("items").push();
//             await newItemRef.set({
//                 id: newItemRef.key,
//                 title: title,
//                 description: description,
//                 category: category,
//                 location: location,
//                 date: date,
//                 phone: contact,
//                 imageUrl: imageUrl,
//                 status: "Lost",
//                 reporterName: user.email.split('@')[0],
//                 userId: user.uid,
//                 createdAt: firebase.database.ServerValue.TIMESTAMP
//             });

//             alert("Lost item reported successfully! 🎉");
//             lostForm.reset();
//             window.location.href = "items-list.html"; 

//         } catch (error) {
//             console.error("Database Error:", error);
//             alert("Error: " + error.message);
//             submitBtn.disabled = false;
//             submitBtn.innerText = "Submit Lost Item";
//         }
//     });
// }

// // AI Description Button
// const aiBtn = document.getElementById("aiGenerateBtn");
// if (aiBtn) {
//     aiBtn.addEventListener("click", () => {
//         const descField = document.getElementById("description");
//         const categoryName = document.getElementById("category").value || "item";
//         descField.value = `[AI GENERATED]: I lost my ${categoryName} near ${document.getElementById("location").value || 'campus'}. It was last seen on ${document.getElementById("date").value || 'recent date'}. Please contact me if found!`;
//     });
// }

// const lostForm = document.getElementById("lostForm");

// if (lostForm) { lostForm.addEventListener("submit", async (e) => { e.preventDefault();

//     const submitBtn = e.target.querySelector('button[type="submit"]');
//     submitBtn.disabled = true;

//     const details = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         location: document.getElementById("location").value,
//         category: document.getElementById("category").value,
//         phone: document.getElementById("contact").value,
//         status: "Lost",
//         reportedBy: auth.currentUser ? auth.currentUser.email : "Anonymous",
//         timestamp: Date.now()
//     };

//     const imageFile = document.getElementById("image").files[0];

//     try {
//         details.imageUrl = "[https://via.placeholder.com/300?text=No+Image](https://via.placeholder.com/300?text=No+Image)";

//         if (imageFile) {
//             try {
//                 const ref = storage.ref(`items/${Date.now()}_${imageFile.name}`);
//                 await ref.put(imageFile);
//                 details.imageUrl = await ref.getDownloadURL();
//             } catch(e) { console.log("Storage error, skipping image."); }
//         }

//         const ref = database.ref("items").push();
//         await ref.set({ id: ref.key, ...details });

//         alert("Successfully submitted for report lost items! It is now in the database.");
//         window.location.href = "items-list.html";
//     } catch (err) {
//         alert(err.message);
//         submitBtn.disabled = false;
//     }
// });
// }

const lostForm = document.getElementById("lostForm");

if (lostForm) {
    lostForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing...";

        // Collect inputs (Ensure these IDs match your post-lost.html)
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const location = document.getElementById("location").value;
        const date = document.getElementById("date").value;
        const contact = document.getElementById("contact").value;
        const file = document.getElementById("image").files[0];

        let finalImageData = "https://via.placeholder.com/300?text=Lost+Item";

        // Image to Base64 conversion
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = (error) => reject(error);
            });
        };

        try {
            if (file) {
                submitBtn.innerText = "Converting Image...";
                finalImageData = await convertBase64(file);
            }

            submitBtn.innerText = "Saving to Registry...";
            
            // Save to the SHARED "items" node
            const newItemRef = firebase.database().ref("items").push();
            
            await newItemRef.set({
                id: newItemRef.key,
                title: title,
                description: description,
                category: category,
                location: location,
                date: date,
                phone: contact,
                imageUrl: finalImageData,
                status: "Lost", // Hardcoded as Lost
                timestamp: Date.now()
            });

            alert("LOST REPORT FILED SUCCESSFULLY!");
            window.location.href = "items.html";

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Lost Item";
        }
    });
}
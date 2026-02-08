/* ==========================================
    POST FOUND ITEM LOGIC
   ========================================== */

// 1. Check Login Status
/* ==========================================
    POST FOUND ITEM - CampusFind AI
   ========================================== */






// auth.onAuthStateChanged(user => {
//     if (!user) {
//         alert("You must be logged in to report found items.");
//         window.location.href = "login.html";
//     }
// });

// const foundForm = document.getElementById("foundForm");
// const foundSubmitBtn = document.getElementById("submitBtn");

// if (foundForm) {
//     foundForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const user = auth.currentUser;
//         if (!user) return;

//         const title = document.getElementById("title").value.trim();
//         const description = document.getElementById("description").value.trim();
//         const category = document.getElementById("category").value;
//         const location = document.getElementById("location").value.trim();
//         const date = document.getElementById("date").value;
//         const contact = document.getElementById("contact").value.trim();
//         const imageFile = document.getElementById("image").files[0];

//         foundSubmitBtn.disabled = true;
//         foundSubmitBtn.innerText = "Processing...";

//         try {
//             let imageUrl = "https://via.placeholder.com/300?text=No+Image+Provided";

//             if (imageFile) {
//                 try {
//                     const fileName = `found_${Date.now()}_${imageFile.name}`;
//                     const fileRef = storage.ref(`found-items/${fileName}`);
//                     await fileRef.put(imageFile);
//                     imageUrl = await fileRef.getDownloadURL();
//                 } catch (imgError) {
//                     console.error("Storage Error:", imgError);
//                 }
//             }

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
//                 status: "Found",
//                 reporterName: user.email.split('@')[0],
//                 userId: user.uid,
//                 createdAt: firebase.database.ServerValue.TIMESTAMP
//             });

//             alert("Success! Your found report has been posted. 🎉");
//             foundForm.reset();
//             window.location.href = "items-list.html";

//         } catch (error) {
//             console.error("Database Error:", error);
//             alert("Error: " + error.message);
//             foundSubmitBtn.disabled = false;
//             foundSubmitBtn.innerText = "Submit Found Item";
//         }
//     });
// }

// // AI Description Button
// const foundAiBtn = document.getElementById("aiGenerateBtn");
// if (foundAiBtn) {
//     foundAiBtn.addEventListener("click", () => {
//         const descField = document.getElementById("description");
//         const categoryName = document.getElementById("category").value || "item";
//         descField.value = `[AI GENERATED]: Found a ${categoryName} near ${document.getElementById("location").value || 'campus'}. It is currently safe with me. Please provide proof of ownership to claim.`;
//     });
// }





// auth.onAuthStateChanged(user => { if (!user) { alert("Please login first!"); window.location.href = "login.html"; } });

// const foundForm = document.getElementById("foundForm");

// if (foundForm) { foundForm.addEventListener("submit", async (e) => { e.preventDefault();

//     const submitBtn = e.target.querySelector('button[type="submit"]');
//     submitBtn.disabled = true;
//     submitBtn.innerText = "Reporting...";

//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const location = document.getElementById("location").value;
//     const category = document.getElementById("category").value;
//     const contact = document.getElementById("contact").value;
//     const imageFile = document.getElementById("image").files[0];

//     try {
//         let imageUrl = "[https://via.placeholder.com/300?text=No+Image](https://via.placeholder.com/300?text=No+Image)";

//         // Attempt Image Upload (Skips if storage is restricted)
//         if (imageFile) {
//             try {
//                 const ref = storage.ref(`items/${Date.now()}_${imageFile.name}`);
//                 await ref.put(imageFile);
//                 imageUrl = await ref.getDownloadURL();
//             } catch (err) {
//                 console.log("Storage upload skipped/failed, using placeholder.");
//             }
//         }

//         // Save to Database
//         const newItemRef = database.ref("items").push();
//         await newItemRef.set({
//             id: newItemRef.key,
//             title: title,
//             description: description,
//             location: location,
//             category: category,
//             phone: contact,
//             imageUrl: imageUrl,
//             status: "Found",
//             reportedBy: auth.currentUser.email,
//             timestamp: Date.now()
//         });

//         alert("Successfully reported! Your found item is now in the database.");
//         window.location.href = "items-list.html";

//     } catch (error) {
//         alert("Error: " + error.message);
//         submitBtn.disabled = false;
//         submitBtn.innerText = "Submit Found Item";
//     }
// });
// }

// auth.onAuthStateChanged(user => { if (!user) { alert("Please login first!"); window.location.href = "login.html"; } });

// const foundForm = document.getElementById("foundForm");

// if (foundForm) { foundForm.addEventListener("submit", async (e) => { e.preventDefault();

//     const submitBtn = e.target.querySelector('button[type="submit"]');
//     submitBtn.disabled = true;
//     submitBtn.innerText = "Saving...";

//     // Collect inputs
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const location = document.getElementById("location").value;
//     const contact = document.getElementById("contact").value;
//     const imageFile = document.getElementById("image").files[0];

//     try {
//         let imageUrl = "[https://via.placeholder.com/300?text=Found+Item](https://via.placeholder.com/300?text=Found+Item)";

//         // Try image upload, if it fails, it uses the placeholder above
//         if (imageFile) {
//             try {
//                 const storageRef = storage.ref(`items/${Date.now()}_${imageFile.name}`);
//                 await storageRef.put(imageFile);
//                 imageUrl = await storageRef.getDownloadURL();
//             } catch (err) { console.log("Image upload skipped/failed."); }
//         }

//         // SAVE TO SHARED NODE: "items"
//         const itemRef = database.ref("items").push();
//         await itemRef.set({
//             id: itemRef.key,
//             title: title,
//             description: description,
//             location: location,
//             phone: contact,
//             imageUrl: imageUrl,
//             status: "Found", // This makes it visible to Person B as Found
//             reportedBy: auth.currentUser.email,
//             timestamp: Date.now()
//         });

//         // SUCCESS ALERT - This will now show up!
//         alert("SUCCESSFULLY REPORTED! Your found item is now in the database.");
//         window.location.href = "items-list.html";

//     } catch (error) {
//         alert("Database Error: " + error.message);
//         submitBtn.disabled = false;
//         submitBtn.innerText = "Submit Found Item";
//     }
// });
// }


// post-found.js
// post-found.js


// const foundForm = document.getElementById("foundForm");

// if (foundForm) {
//     foundForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const submitBtn = document.getElementById("submitBtn");
//         submitBtn.disabled = true;
//         submitBtn.innerText = "Saving to Database...";

//         // Collect inputs using your exact HTML IDs
//         const title = document.getElementById("title").value;
//         const description = document.getElementById("description").value;
//         const category = document.getElementById("category").value;
//         const location = document.getElementById("location").value;
//         const contact = document.getElementById("contact").value;

//         try {
//             // Using a placeholder to bypass the 'Upgrade' error in Storage
//             let imageUrl = "https://via.placeholder.com/300?text=Item+Image";

//             // Save directly to the 'items' node in the Database
//             const itemsRef = firebase.database().ref("items");
//             const newItemRef = itemsRef.push();
            
//             await newItemRef.set({
//                 id: newItemRef.key,
//                 title: title,
//                 description: description,
//                 category: category,
//                 location: location,
//                 phone: contact,
//                 imageUrl: imageUrl,
//                 status: "Found",
//                 timestamp: Date.now()
//             });

//             // SUCCESS ALERT - Triggered for Person A
//             alert("SUCCESSFULLY REPORTED! Your found item is now in the registry.");
            
//             // Redirect to the Browse page (items.html)
//             window.location.href = "items.html";

//         } catch (error) {
//             console.error("Database Error:", error);
//             alert("Error: " + error.message);
//             submitBtn.disabled = false;
//             submitBtn.innerText = "Submit Found Item";
//         }
//     });
// }



const foundForm = document.getElementById("foundForm");

if (foundForm) {
    foundForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing Image...";

        const file = document.getElementById("image").files[0];
        let finalImageData = "https://via.placeholder.com/300?text=No+Image";

        // FUNCTION TO CONVERT IMAGE TO STRING (Bypasses Storage Upgrade)
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
                // If file is too big (>1MB), it might hit database limits. 
                // We convert it to a string here.
                finalImageData = await convertBase64(file);
            }

            submitBtn.innerText = "Saving to Database...";
            const newItemRef = firebase.database().ref("items").push();
            
            await newItemRef.set({
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                category: document.getElementById("category").value,
                location: document.getElementById("location").value,
                phone: document.getElementById("contact").value,
                imageUrl: finalImageData, // This is now the actual image data
                status: "Found",
                timestamp: Date.now()
            });

            alert("SUCCESSFULLY REPORTED! Image and details saved.");
            window.location.href = "items.html";

        } catch (error) {
            alert("Error: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Found Item";
        }
    });
}
// upload.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase-config";

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file object from input
 * @param {string} folder - Optional folder name in Storage
 * @returns {Promise<string>} - Returns download URL
 */
export const uploadFile = async (file, folder = "uploads") => {
  if (!file) throw new Error("No file selected");

  try {
    // Create a storage reference
    const storageRef = ref(storage, `${folder}/${file.name}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!", snapshot);

    // Get download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);

    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

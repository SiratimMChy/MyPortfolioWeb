import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyAxe1X8H4q6cnEbPTIczQFN_ahNaP3sRwY",
  authDomain: "my-profolio-1e719.firebaseapp.com",
  databaseURL: "https://my-profolio-1e719-default-rtdb.firebaseio.com",
  projectId: "my-profolio-1e719",
  storageBucket: "my-profolio-1e719.appspot.com",
  messagingSenderId: "693342029380",
  appId: "1:693342029380:web:32bce82e325c74425b9e11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// --- Cloudinary Config ---
const cloudName = "dawhijbc0";
const uploadPreset = "protfolio";

// Upload image to Cloudinary
export async function uploadImage(file) {
  if (!file) return null;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
}

// Save recommendation
export async function saveRecommendation(rec) {
  const recRef = ref(database, "recommendations");
  return push(recRef, rec);
}

// Listen to recommendations in real-time
export function listenRecommendations(callback) {
  const recRef = ref(database, "recommendations");
  onValue(recRef, (snapshot) => {
    const recommendations = [];
    snapshot.forEach((child) => recommendations.push(child.val()));
    recommendations.sort((a, b) => b.timestamp - a.timestamp);
    callback(recommendations);
  });
}

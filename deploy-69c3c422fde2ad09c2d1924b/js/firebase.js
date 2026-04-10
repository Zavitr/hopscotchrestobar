import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
let db, auth;

async function initApp() {
    try {
        if(Object.keys(firebaseConfig).length > 0) {
            const app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);

            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await signInWithCustomToken(auth, __initial_auth_token);
            } else {
                await signInAnonymously(auth);
            }

            onAuthStateChanged(auth, (user) => {
                if (user) listenToCMSData(user);
            });
        } else {
            window.applyCMSDataToDOM(window.siteData);
        }
    } catch (error) {
        window.applyCMSDataToDOM(window.siteData); 
    }
    
    window.initScrollAnimations();
}

function listenToCMSData(user) {
    if(!db || !user) return;
    const docRef = doc(db, 'artifacts', window.appId, 'public', 'data', 'hopscotch_config', 'main');
    
    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            window.siteData = { ...window.siteData, ...docSnap.data() };
            window.applyCMSDataToDOM(window.siteData);
            window.populateAdminFields(window.siteData);
        } else {
            setDoc(docRef, window.siteData).catch(err => console.error("Error seeding:", err));
        }
    }, (error) => {
        console.error("Snapshot error:", error);
    });
}

window.saveCMSData = async () => {
    if(!db || !auth || !auth.currentUser) {
        window.saveCMSDataOfflineFallback();
        return;
    }

    const btnText = document.getElementById('save-btn-text');
    const spinner = document.getElementById('save-spinner');
    const statusMsg = document.getElementById('save-status');

    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');

    const newGallery = Array.from(document.querySelectorAll('.gal-url-input')).map(input => input.value).filter(v => v.trim() !== '');

    const newData = {
        heroImg: document.getElementById('input-hero-img').value,
        aboutText: document.getElementById('input-about-text').value,
        gallery: newGallery,
        pin: document.getElementById('input-admin-pin').value,
    };

    try {
        const docRef = doc(db, 'artifacts', window.appId, 'public', 'data', 'hopscotch_config', 'main');
        await setDoc(docRef, newData);
        
        statusMsg.style.opacity = '1';
        setTimeout(() => { statusMsg.style.opacity = '0'; }, 3000);
    } catch (error) {
        console.error("Save error:", error);
        window.saveCMSDataOfflineFallback();
    } finally {
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
};

document.addEventListener("DOMContentLoaded", initApp);

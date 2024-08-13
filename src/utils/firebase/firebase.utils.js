import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAYYeP6TIvZmW0NXeENngiXR9By5yVHsXA",
    authDomain: "crwn-clothing-db-28545.firebaseapp.com",
    projectId: "crwn-clothing-db-28545",
    storageBucket: "crwn-clothing-db-28545.appspot.com",
    messagingSenderId: "81893363122",
    appId: "1:81893363122:web:fbdd8733501454d01c68ab"
  };


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(
                userDocRef, {
                    displayName,
                    email,
                    createdAt
                }
            );
        }
        catch(error) {
            console.log(error);
        }
    }

    return userDocRef;
}
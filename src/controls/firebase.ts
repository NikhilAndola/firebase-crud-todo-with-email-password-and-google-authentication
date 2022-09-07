import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  initializeAuth,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxwhHHKjtYqjYoShKiNl5JXT2QNRVx70g",
  authDomain: "fir-auth-todos.firebaseapp.com",
  projectId: "fir-auth-todos",
  storageBucket: "fir-auth-todos.appspot.com",
  messagingSenderId: "857721277125",
  appId: "1:857721277125:web:f068dbec56b51f041afeac",
  measurementId: "G-WRJY2Q921L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "google",
        email: user.email,
        data: [],
      });
    }
  } catch (err) {
    console.error(err);
    //@ts-ignore
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    //@ts-ignore
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  data: {
    "id": number,
  "title": string,
  "completed"?: boolean,
  "createdAt"?: string,
  "remindAt"?: string,
}[]
  ,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      data,
    });
  } catch (err) {
    console.error(err);
    //@ts-ignore
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    //@ts-ignore
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

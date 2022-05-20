import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC1D5-z4ZijsX9fMtxzArZ_0_4lo5vImik",
  authDomain: "react-project-fa2d3.firebaseapp.com",
  projectId: "react-project-fa2d3",
  storageBucket: "react-project-fa2d3.appspot.com",
  messagingSenderId: "760848444153",
  appId: "1:760848444153:web:d11d28097b29727d239028"
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)

export const storage = getStorage(app)
// export const storageRef = ref(storage,'images/') 

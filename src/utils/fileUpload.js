import { storage, db } from "../config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

export function fileUpload(file, id, Userdata, setProgress) {
  let storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress((prev) => ({ ...prev, value: progress, show: true }));
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        let data = {
          ...Userdata,
          imageUrl: downloadURL,
          imageName: file.name,
        };
        if (id) {
          setDoc(doc(db, "users", id), data).then(() =>
            setProgress({ show: false, value: 0 })
          );
        } else {
          addDoc(collection(db, "users"), data).then((dataRef) =>
            setProgress({ show: false, value: 0 })
          );
        }
      });
    }
  );
}

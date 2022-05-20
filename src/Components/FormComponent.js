import React, { useEffect, useState } from "react";
import { storage } from "../config";
import { fileUpload } from "../utils/fileUpload";

//styles import
import styles from "../styles/formcomponent.module.css";
import { ref, deleteObject } from "firebase/storage";

//firebase imports
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";

//mui imports
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        variant: "div",
        width: "90%",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const FormComponent = ({ setEdit, Edit }) => {
  const [Userdata, setUserdata] = useState({
    name: "",
    email: "",
    age: "",
    imageName: "",
  });
  const [selectedFile, setFile] = useState(null);
  const [file, setFiles] = useState(null);
  const [progress, setProgress] = useState({ show: false, value: 0 });

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  function handleChange(e) {
    setUserdata({ ...Userdata, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function setEditForm() {
      const userRef = doc(db, "users", Edit.id);
      const userSnap = await getDoc(userRef);
      const { name, email, age, imageUrl, imageName } = userSnap.data();
      setFile(imageUrl);
      setUserdata({ name, email, age, imageName });
    }

    if (Edit.isEdit) {
      setEditForm();
    }
  }, [Edit]);

  //optimization of code
  function handleSubmit() {
    let data;
    if (!Edit.isEdit) {
      if (file) {
        fileUpload(file, null, Userdata, setProgress);
      } else {
        addDoc(collection(db, "users"), Userdata).then((dataRef) =>
          console.log("document id:", dataRef.id)
        );
      }
    } else {
      if (file) {
        if (Userdata.imageName) {
          const imageRef = ref(storage, `images/${Userdata.imageName}`);
          //delete the image
          deleteObject(imageRef)
            .then(() => {
              console.log("deleted");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        //editing the current file
        fileUpload(file, Edit.id, Userdata, setProgress);
      } else {
        data = {
          ...Userdata,
          imageUrl: selectedFile || null,
          imageName: Userdata.imageName || null,
        };

        console.log(data);
        setDoc(doc(db, "users", Edit.id), data).then(() =>
          console.log("succesfully edited !")
        );
      }

      setEdit({ id: "", isEdit: false });
    }

    setUserdata({ name: "", email: "", age: "" });
    setFile(null);
    setFiles(null);
  }
  console.log(progress);
  return (
    <div className={styles.formContainer}>
      {selectedFile && (
        <div className={styles.imageWrapper}>
          <img className={styles.Image} src={selectedFile} alt="uploaded" />
        </div>
      )}

      <div className={styles.formWrapper}>
        <label className={styles.label}>First Name</label>
        <input
          name="name"
          className={styles.inputLabel}
          type="text"
          onChange={handleChange}
          value={Userdata.name}
        />
      </div>

      <div className={styles.formWrapper}>
        <label className={styles.label}>Email</label>
        <input
          name="email"
          className={styles.inputLabel}
          type="text"
          onChange={handleChange}
          value={Userdata.email}
        />
      </div>

      <div className={styles.formWrapper}>
        <label className={styles.label}>Age</label>
        <input
          name="age"
          className={styles.inputLabel}
          type="number"
          onChange={handleChange}
          value={Userdata.age}
        />
      </div>

      <div className={styles.formWrapper}>
        <label className={styles.label}>Upload Image</label>
        <input
          className={styles.inputLabel}
          type="file"
          onChange={handleFileChange}
          title=" "
        />
      </div>

      {progress.show && <LinearProgressWithLabel value={progress.value} />}

      <button className={styles.submitBtn} onClick={handleSubmit}>
        {Edit.isEdit ? "Edit" : "Create data"}
      </button>
    </div>
  );
};

export default FormComponent;

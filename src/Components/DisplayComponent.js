import React, { useEffect, useState } from "react";
import styles from "../styles/formcomponent.module.css";
import { db } from "../config";
import defaultImage from "../images/index.png";

//imports from material ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";

const DisplayComponent = ({ setEdit, Edit }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = () => {
      onSnapshot(collection(db, "users"), (querySnapShot) => {
        let datas = [];
        querySnapShot.forEach((doc) => {
          datas.push({ ...doc.data(), id: doc.id });
        });
        setRows(datas);
      });
    };
    getData();
  }, []);
  console.log(rows);

  function handleDelete(id) {
    const docRef = doc(db, "users", id);
    deleteDoc(docRef).then(() => console.log("deleted !"));
  }

  async function handleEdit(id) {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    setEdit({ isEdit: true, id: userSnap.id });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.imageUrl ? (
                <TableCell component="th" scope="row">
                  <img
                    className={styles.Image}
                    src={row.imageUrl}
                    alt="uploaded"
                  />
                </TableCell>
              ) : (
                <TableCell>
                  <img
                    className={styles.Image}
                    src={defaultImage}
                    alt="uploaded"
                  />
                </TableCell>
              )}

              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  disabled={row.id === Edit.id}
                  onClick={() => handleEdit(row.id)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayComponent;

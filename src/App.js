import styles from "./styles/app.module.css";
import FormComponent from "./Components/FormComponent";
import DisplayComponent from "./Components/DisplayComponent";
import { useState } from "react";
import { UserContextWrapper } from "./context/UserContext";

function App() {
  const [Edit, setEdit] = useState({ isEdit: false, id: "" });

  return (
    <UserContextWrapper>
      <div className={styles.appWrapper}>
        <FormComponent setEdit={setEdit} Edit={Edit} />
        <DisplayComponent setEdit={setEdit} Edit={Edit} />
      </div>
    </UserContextWrapper>
  );
}

export default App;

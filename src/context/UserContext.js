import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextWrapper = (props) => {
  const [users, setUsers] = useState([{ name: "ashok dai", id: 1 }]);
  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};

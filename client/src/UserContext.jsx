import axios from "axios";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

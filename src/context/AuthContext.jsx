import { createContext, useState } from "react";

export const AuthContext = createContext({
  username: "",
  setUsername: (username) => {},
});

export default AuthContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

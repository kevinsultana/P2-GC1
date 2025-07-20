import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

export const useAuth = useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

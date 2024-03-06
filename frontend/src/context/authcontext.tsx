import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface Children {
  children: JSX.Element;
}
export const authContext = createContext({
  auth: false,
  loading: false,
  setAuth: () => {},
});
export default function AuthProvider(props: Children) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseurl = import.meta.env.VITE_BASE_USER_URL;
  useEffect(() => {
    getAuth();
  }, []);
  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        const res = await axios.get(`${baseurl}check-token`, {
          headers: {
            Authorization: token,
          },
        });

        setLoading(false);
        return setAuth(res.data.auth);
      } else {
        setLoading(false);
        return setAuth(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return setAuth(auth);
    }
  };
  console.log("authContext.tsx", auth);

  return (
    <authContext.Provider
      value={{
        auth: auth,
        loading: loading,
        setAuth: () => {
          setAuth(true);
        },
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  posts: [];
}

interface Children {
  children: JSX.Element;
}

export const userContext = createContext<{ user: User | null }>({
  user: null,
});

export default function UserProvider(props: Children) {
  const [user, setUser] = useState<User | null>(null);

  const baseurl = import.meta.env.VITE_BASE_USER_URL;
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    if (localStorage.getItem("id")) {
      try {
        const res = await axios.get(
          `${baseurl}me/${localStorage.getItem("id")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(res.data.user);
        return user;
      } catch (error) {
        console.log(error);
      }
    }
    return setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
}

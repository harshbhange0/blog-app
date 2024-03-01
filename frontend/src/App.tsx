import Register from "./pages/Register";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Feeds from "./pages/Feeds";
import DisplayPost from "./pages/DisplayPost";
import { useContext } from "react";
import { authContext } from "./context/authcontext";

export default function App() {
  const { auth,loading } = useContext(authContext);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <main className=" flex flex-col justify-center items-center max-h-screen">
        <div className="mx-auto sm:w-1/2 px-2 relative h-full">
          <Routes>
            <Route
              path="/"
              element={auth ? <Feeds /> :  <Register />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/auth/feed/posts/:id" element={<DisplayPost />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

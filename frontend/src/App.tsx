import Register from "./pages/Register";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Feeds from "./pages/Feeds";
import DisplayPost from "./pages/DisplayPost";
import { useContext } from "react";
import { authContext } from "./context/authcontext";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";

export default function App() {
  const { auth } = useContext(authContext);
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
      <header
        className="fixed top-0 w-full flex items-center shadow-sm
      me-2"
      >
        <Navbar />
      </header>
      <main className=" max-w-2xl w-full mx-auto flex flex-col px-2 justify-center items-center mt-[66px] max-h-[calc(100vh-66px)]">
        <Routes>
          <Route path="/" element={auth ? <Feeds /> : <Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="login" element={<Login />} />
          <Route path="/auth/feed/posts/:id" element={<DisplayPost />} />
        </Routes>
      </main>
    </>
  );
}

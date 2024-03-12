import Register from "./pages/Register";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Feeds from "./pages/Feeds";
import DisplayPost from "./pages/DisplayPost";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";
import MyPost from "./pages/MyPost";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <Analytics />
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
        className="fixed top-0 z-20 me-2 flex w-full
      items-center shadow-sm"
      >
        <Navbar />
      </header>
      <main className=" -z-20 mx-auto mt-[66px] flex min-h-[calc(100vh-66px)] w-full max-w-5xl flex-col">
        <Routes>
          <Route path="/" element={<Feeds />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/my-post" element={<MyPost />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/auth/feed/normal-post/:postid"
            element={<DisplayPost />}
          />
          <Route
            path="/auth/feed/update-post/:postid/:userid"
            element={<DisplayPost />}
          />
        </Routes>
      </main>
    </>
  );
}

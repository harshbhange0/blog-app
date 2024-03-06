import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authcontext";
import { ImCross } from "react-icons/im";

export default function PopUp() {
  const { auth } = useContext(authContext);
  const [isHidden, setHidden] = useState(true);
  let Inreverl: any;
  useEffect(() => {
    if (!auth) {
      console.log("timer start");

      Inreverl = setTimeout(() => {
        setHidden(false);
        console.log("timer end");
      }, 120000);
    } else {
      setHidden(true);
      clearInterval(Inreverl);
    }
  }, [auth]);

  return (
    <div
      id="popup"
      className={` ${
        isHidden ? "hidden" : ""
      } w-full h-screen absolute z-50 bg-black/20 glass top-0 left-0 `}
    >
      <div className=" relative w-full h-full flex justify-center items-center">
        <div
          className="rounded-full cursor-pointer absolute top-20 p-1 right-20 bg-white/30 "
          onClick={() => {
            setHidden(true);
            clearTimeout(Inreverl);
          }}
        >
          <ImCross />
        </div>
        <div className=" sm:max-w-[80%] lg:min-w-[60%]  lg:max-w-[50%] mx-auto bg-white/60 px-3 pt-4 pb-8 rounded-xl flex md:flex-row flex-col gap-x-8 gap-y-8">
          <div className="my-auto ">
            <h1 className="text-xl font-semibold md:text-2xl mx-3 block">
              Sign up to discover human stories that deepen your understanding
              of the world.
            </h1>
          </div>
          <div className="bg-white mx-auto px-3 py-2 space-y-4 rounded-sm shadow-md">
            <div className="border-b border-gray-400/50 pb-1">
              <span className=" font-semibold">Register/Log In Free</span>
            </div>
            <div className="text-sm border-b border-gray-400/50 pb-3">
              <ul className="space-y-1 list-image-[url(/check.png)] list-inside">
                <li>Distraction-free reading and writing your Own Content.</li>
                <li>Tell your story. Find your audience.</li>
                <li>Organize your knowledge with lists and highlights.</li>
              </ul>
            </div>
            <div className="flex justify-center pb-2">
              <Link
                onClick={() => {
                  setHidden(true);
                  clearTimeout(Inreverl);
                }}
                className=" px-4 py-2 font-semibold text-sm rounded-3xl bg-black text-white"
                to={"/register"}
              >
                Register/Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

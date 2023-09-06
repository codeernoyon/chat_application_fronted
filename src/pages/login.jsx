"use client";
import Button from "@/components/common/Button";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { USER } from "@/utils/ApiRoutes";
import { auth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

function login() {
  const [checked, setChecked] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [user, setUser] = useState(null);
  // for routing
  const router = useRouter();

  // dispatch function for set user global state
  const [{}, dispatch] = useStateProvider();

  // ----- it's a login function with fire base

  const login = async () => {
    if (!checked) {
      // if user don't fill checked show popup box
      setShowPopUp(true);
      return;
    }
    // google  sign in with popup for user login
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: imageUrl },
    } = await signInWithPopup(auth, provider);
    try {
      // call api for send data backend and get response with data
      const res = await axios.post(USER, {
        name,
        email,
        imageUrl,
      });

      // save get data from api on localStorage
      localStorage.setItem("User", JSON.stringify(res.data.user));
      const dUser = JSON.parse(localStorage.getItem("User"));

      // set user information on global state it can use any components
      dispatch({
        type: reducerCase.SET_USER,
        userInfo: {
          ...dUser,
        },
      });
      // routing main page after successfully login
      toast.success("Login successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something was wrong");
    }
  };

  useEffect(() => {
    // get user data from localStorage
    const dUser = JSON.parse(localStorage.getItem("User"));
    setUser(dUser);

    // set user information on global state it can use any components
    dispatch({
      type: reducerCase.SET_USER,
      userInfo: {
        ...dUser,
      },
    });

    // if user fill checked close popup box
    if (checked) {
      setShowPopUp(false);
    }
  }, [dispatch]);

  // if user already save in localStorage it's redirect home page
  if (user) router.replace("/");
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="lg:w-[30%] 2xl:w-[50%] h-screen md:h-auto flex items-center justify-center flex-col border-[2px] border-emerald-600 rounded-xl py-10 px-5 text-slate-400 bg-panel-header-background2">
        {/* whats app icon/image */}
        <Image
          src="/whatsapp.gif"
          alt="whatsapp icon"
          height={150}
          width={150}
        />
        <span className="relative mt-3 text-xl text-slate-400 font-semibold">
          Welcome to WhatsApp Clone
        </span>
        {/* login button */}
        <Button
          title="Login with google"
          icon={<FcGoogle />}
          onClick={login}
          className={`border border-emerald-600 px-10 py-3 rounded mt-10 text-[18px]  font-[400] `}
          iconclassName="text-25px] mr-3"
        />
        {/* check box */}
        <div className="mt-10">
          {/* check box */}
          <input
            type="checkbox"
            required
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span className="relative ml-2 text-slate-400 ">
            {/* error popup box */}
            {showPopUp && (
              <span className="absolute top-[-140%] bg-sky-800 px-2 text-red-300">
                Please check it first
              </span>
            )}
            Agree with Trams & Policy
          </span>
        </div>
        {/* bottom content */}
        <p className="mt-16 2xl:text-[18px]">
          Read our Privacy Policy. Tap{" "}
          <span className="text-blue-400 cursor-pointer">
            "Agree & Continue"
          </span>{" "}
          to accept the Terms of Service.
        </p>
      </div>
    </div>
  );
}

export default login;

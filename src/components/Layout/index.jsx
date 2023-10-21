"use client";
import { useStateProvider } from "@/context/StateContext";
import { PeerProvider } from "@/context/WebRTC";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../Loading";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function Layout({ children }) {
  const [{}, dispatch] = useStateProvider();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const dUser = JSON.parse(localStorage.getItem("User"));
    setUser(dUser);
    if (user) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <PeerProvider>
      <Head>
        <title>What's app clone</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Loading />
      <main
        className={`h-screen w-screen xl:w-[1450px] xl:flex justify-center items-center bg-panel-header-background ${roboto.className} `}
      >
        {/* container div */}
        <div className="h-full w-full overflow-hidden relative">
          <div className="relative z-[99992]">
            <Toaster
              toastOptions={{
                // Define default options
                duration: 3000,
                className: "",
                style: {
                  background: "#182229",
                  color: "#fff",
                  borderWidth: "2px",
                  borderColor: "green",
                  padding: "10px",
                },
              }}
            />
          </div>
          {children}
        </div>
      </main>
    </PeerProvider>
  );
}

export default Layout;

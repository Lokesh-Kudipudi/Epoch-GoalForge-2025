"use client";
import { motion } from "framer-motion";
import LoginButton from "./LoginButton";
import { useCustomContext } from "@/contexts/ContextProvider";
import TextBox from "./TextBox";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import {
  getPDF,
  getRoadMap,
  getUser,
  insertData,
  LoginIn,
  Logout,
} from "@/lib/api";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import goalForgeLogo from "@/assets/goalForge_Logo.png";
// import { generateTestPDF } from "@/lib/generateTestPdf";

export const Hero = () => {
  const { user, setUser, setProcessing, setStatus } =
    useCustomContext();
  const [value, setValue] = useState();
  const router = useRouter();

  useEffect(() => {
    const setInitUser = async () => {
      const userRes = await getUser();
      setUser(() => {
        const userInfo = userRes?.user_metadata;
        if (userInfo) {
          return {
            avatar: userInfo.avatar_url,
            email: userInfo.email,
            name: userInfo.name,
            fullName: userInfo.full_name,
          };
        } else {
          return false;
        }
      });
    };
    setInitUser();
  }, []);

  const handleLogout = async () => {
    await Logout();
    setUser(() => false);
  };

  const handleSubmitResolution = async () => {
    router.push("/thankyou");
    setProcessing(() => true);
    setStatus(() => "Forging RoadMap");
    const responseObject = await getRoadMap(value);
    setStatus(() => "Crafting PDF");
    await insertData(user, responseObject);
    await getPDF({ ...user, ...responseObject });
    setStatus(() => "Done");
    setProcessing(() => false);
  };

  const handleLogin = async () => {
    await LoginIn();
    await getUser();
  };

  // const handleTestPDF = async () => {
  //   generateTestPDF();
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 items-center via-black to-black text-white flex justify-center"
    >
      <div className="text-center flex items-center flex-col">
        <Image
          src={goalForgeLogo}
          alt="Goal Forge Logo"
          width={250}
          height={250}
        ></Image>
        <div className="-translate-y-16">
          {user ? (
            <>
              <TextBox
                value={value}
                setValue={setValue}
              ></TextBox>
              <SubmitButton
                handleSubmitResolution={handleSubmitResolution}
              ></SubmitButton>
              <div className="flex flex-col gap-1 items-start mt-4 text-gray-400">
                <p>1) Enter your new year resolutions.</p>
                <p>2) Click on the submit button.</p>
                <p>3) Wait for the magic to happen.</p>
              </div>
            </>
          ) : (
            <>
              <LoginButton
                handleLogin={handleLogin}
              ></LoginButton>
              <p className="text-gray-400 mt-2 font-serif">
                Login using Institute mail id.
              </p>
            </>
          )}
        </div>
      </div>
      {user && (
        <LogoutButton handleLogout={handleLogout}></LogoutButton>
      )}
      {user && (
        <Image
          src={user.avatar}
          width={50}
          height={50}
          alt="avatar"
          className="absolute rounded-full top-[50px] right-[20px]"
        ></Image>
      )}
    </motion.div>
  );
};

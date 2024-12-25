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

export const Hero = () => {
  const { user, setUser } = useCustomContext();
  const [value, setValue] = useState();

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
          return {};
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
    const responseObject = await getRoadMap(value);
    const data = await insertData(user, responseObject);
    await getPDF(data[0]);
  };

  const handleLogin = async () => {
    await LoginIn();
    await getUser();
    // setUser(() => {
    //   const userInfo = userRes?.user_metadata;
    //   return {
    //     avatar: userInfo.avatar_url,
    //     email: userInfo.email,
    //     name: userInfo.full_name,
    //   };
    // });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 items-center via-black to-black text-white flex justify-center"
    >
      <div className="text-center flex items-center flex-col">
        {user && <h2>{user.full_name}</h2>}
        <h1 className="text-4xl md:text-5xl font-bold mb-1">
          Welcome to Goal Forge
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Roadmap for your New Year Resolutions
        </p>
        {user ? (
          <>
            <TextBox value={value} setValue={setValue}></TextBox>
            <SubmitButton
              handleSubmitResolution={handleSubmitResolution}
            ></SubmitButton>
          </>
        ) : (
          <LoginButton handleLogin={handleLogin}></LoginButton>
        )}
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
          onClick={() => {
            console.log(user);
          }}
          className="absolute rounded-full top-[20px] right-[20px]"
        ></Image>
      )}
    </motion.div>
  );
};

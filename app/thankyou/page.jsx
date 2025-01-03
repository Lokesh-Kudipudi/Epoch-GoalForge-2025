"use client";
import { useCustomContext } from "@/contexts/ContextProvider";
import { motion } from "framer-motion";
import epochLogo from "@/assets/epoch_logo.png";
import Image from "next/image";

function ThankYou() {
  const { processing, status } = useCustomContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 items-center via-black to-black text-white flex justify-center"
    >
      <div className="text-center flex items-center flex-col text-white">
        {processing ? (
          <>
            <div className="loader relative block w-[250px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#0071e2] rounded-full animate-moving"></div>
            </div>
            <div className="mt-3">{status}</div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">Thank You</h1>
            <Image
              src={epochLogo}
              alt="Epoch Logo"
              width={100}
              height={100}
            ></Image>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ThankYou;

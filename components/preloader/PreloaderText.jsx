import { motion } from "framer-motion";
import { textVariants } from "../../constants/animations";
import Image from "next/image";
import epochLogo from "@/assets/epoch_logo.png";

export const PreloaderText = () => {
  return (
    <motion.div
      className="relative z-10"
      variants={textVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-0">
        <Image
          src={epochLogo}
          alt="Epoch Logo"
          height={200}
          width={200}
        ></Image>
        <h1 className="text-md md:text-base font-bold -translate-y-12 text-gray-400 tracking-wider">
          Presents
        </h1>
      </div>
    </motion.div>
  );
};

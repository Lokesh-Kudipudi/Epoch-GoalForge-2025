import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { containerVariants } from "@/constants/animations";
import { DecorativeLines } from "./DecorativeLines";
import { PreloaderText } from "./PreloaderText";

export const Preloader = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative">
            <DecorativeLines />
            <PreloaderText />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { motion } from "framer-motion";
import { textVariants } from "../../constants/animations";

export const PreloaderText = () => {
  return (
    <motion.div
      className="relative z-10"
      variants={textVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-3xl md:text-6xl font-bold text-white tracking-wider">
        Epoch Presents
        <span className="block text-center text-2xl md:text-4xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Goal Forge
        </span>
      </h1>
    </motion.div>
  );
};

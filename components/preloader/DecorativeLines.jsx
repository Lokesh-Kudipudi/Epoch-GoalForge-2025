import { motion } from "framer-motion";
import { lineVariants } from "@/constants/animations";

export const DecorativeLines = () => {
  return (
    <motion.div
      className="absolute inset-0 -m-8"
      variants={lineVariants}
      initial="initial"
      animate="animate"
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-white/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear",
          }}
          style={{
            width: `${100 + i * 40}%`,
            height: `${100 + i * 40}%`,
            left: `${-i * 20}%`,
            top: `${-i * 20}%`,
          }}
        />
      ))}
    </motion.div>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxGrid = ({ children, speed = 0.3 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -200]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full">
      {children}
    </motion.div>
  );
};

export default ParallaxGrid;

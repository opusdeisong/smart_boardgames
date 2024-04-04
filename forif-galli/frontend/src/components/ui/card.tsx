import { Variants, motion } from "framer-motion";

export default function Card({
  emoji,
  visible,
}: {
  emoji: string;
  visible: boolean;
}) {
  return (
    <>
      {visible && (
        <motion.div key={emoji} className="card" variants={cardVariants}>
          {emoji}
        </motion.div>
      )}
    </>
  );
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 330,
  },
  visible: {
    opacity: 1,
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: 330,
  },
};

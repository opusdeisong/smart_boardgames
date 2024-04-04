import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { useTimeout } from "usehooks-ts";
import Card from "../ui/card";
export default function InitialScreen() {
  const [visible, setVisible] = useState(true);

  const hide = () => {
    setVisible(false);
  };

  useTimeout(hide, 3000);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <>
          <div className="h-screen bg-white w-screen flex flex-col items-center justify-center fixed z-50">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
              }}
              key={"initial-screen-letters"}
              className="text-8xl"
              style={{ fontFamily: "Black Han Sans" }}
            >
              포리프-갈리
            </motion.h1>
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-row justify-evenly items-center w-full"
            >
              {food.map((val) => (
                <Card emoji={val} key={val} visible={visible} />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const food: string[] = ["🍅", "🍊", "🍋", "🍐"];

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

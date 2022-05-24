import { motion } from "framer-motion";
import { useRouter } from "next/router";
const withTransition = (OriginalComponent) => {

  return () => (
    <>
      <OriginalComponent />
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {useRouter().pathname =="/main" ? <>
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      </> : <>
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      </>}
      
    </>
  );
};

export default withTransition;
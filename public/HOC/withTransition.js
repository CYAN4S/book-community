import { motion } from "framer-motion";
import { useRouter } from "next/router";
const withTransition = (OriginalComponent) => {

  // HOC for Page Animation
  return () => (
    <>
      <OriginalComponent />
      {useRouter().pathname =="/main" ? <>
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }} // 1s 후
        animate={{ scaleY: 0 }} // direction
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      </> : <>
      {/* <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      /> */}
      </>}
      
    </>
  );
};

export default withTransition;
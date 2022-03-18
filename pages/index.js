
import { useState } from "react";
import Sign from "./sign";

export default function Home() {
  const [isSigned, setIsSigned] = useState(false);
  const [init, setInit] = useState(true);
  return (
   <>
    {init ? <Sign/> : "Initializing.."}
   </>
  )
}

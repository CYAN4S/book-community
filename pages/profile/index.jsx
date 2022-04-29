import { onAuthStateChanged } from "firebase/auth";
import { authService as auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProfileRoute() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace(`/profile/${user.uid}`);
      } else {
        router.replace("/");
      }
    });
  }, []);

  return <></>;
}

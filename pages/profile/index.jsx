import { onAuthStateChanged } from "firebase/auth";
import { authService as auth } from "../../firebaseConfig";
import { useRouter } from "next/router";

export default function ProfileRoute() {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace(`/profile/${user.uid}`);
    } else {
      router.replace("/");
    }
  });

  return null;
}

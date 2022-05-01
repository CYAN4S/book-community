export default function toNativeString(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}
      ${week[date.getDay()]}요일${date.getHours() < 12 ? " 오전" : " 오후"}
           ${(((date.getHours() + 11) % 12) + 1)
             .toString()
             .padStart(2, "0")} : ${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} : ${date.getSeconds().toString().padStart(2, "0")}`;
}

import { dbService as db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getUserDoc = async (uid) => {
  const docRef = doc(db, "profile", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else
    return null;
};

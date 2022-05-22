import { dbService as db } from "../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { usersDisplayNameState, usersPhotoState } from "./hooks";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

export const getUserDoc = async (uid) => {
  if (!uid) return null;

  const docRef = doc(db, "profile", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid, ...docSnap.data() };
  } else return { uid };
};

/**
 * `uid` 사용자의 프로필이 변경될 때 `callback`이 호출됩니다.
 * @param {string} uid
 * @param {(any) => void} callback
 * @returns {Unsubscribe}
 */
export const onUserDocSnapshot = (uid, callback) => {
  if (!uid) return null;

  return onSnapshot(
    doc(db, "profile", uid),
    (doc) => callback({ uid, ...doc.data() }),
    (error) => {
      console.log(error);
      callback(null);
    }
  );
};

// TODO: Extract function
export const useUserDisplayName = (targetUid) => {
  const [users, setUsers] = useRecoilState(usersDisplayNameState);
  const [name, setName] = useState(null);

  useEffect(async () => {
    if (!users.hasOwnProperty(targetUid)) {
      const userDoc = await getUserDoc(targetUid);
      setUsers((prev) => ({
        ...prev,
        [targetUid]: userDoc?.displayName ?? "게스트",
      }));
      setName(userDoc?.displayName ?? "게스트");
    } else {
      const userDoc = await getUserDoc(targetUid);
      if (userDoc?.displayName != users[targetUid]) {
        setName(userDoc?.displayName);
      } else {
        setName(users[targetUid]);
      }
    }
  }, []);

  return name;
};

export const useUserPhoto = (targetUid) => {
  const [users, setUsers] = useRecoilState(usersPhotoState);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(async () => {
    if (!users.hasOwnProperty(targetUid)) {
      const userDoc = await getUserDoc(targetUid);
      setUsers((prev) => ({
        ...prev,
        [targetUid]:
          userDoc?.userPhoto ??
          "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      }));
      setUserPhoto(
        userDoc?.userPhoto ??
          "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
      );
    } else {
      const userDoc = await getUserDoc(targetUid);
      if (userDoc?.userPhoto != users[targetUid]) {
        setUserPhoto(
          userDoc?.userPhoto ??
            "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        );
      } else {
        setUserPhoto(users[targetUid]);
      }
    }
  }, []);

  return userPhoto;
};

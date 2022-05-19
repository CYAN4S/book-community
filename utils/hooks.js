import { atom, selector, useRecoilState } from "recoil";
import { authService as auth } from "../firebaseConfig";
import { useState, useEffect } from "react";

export const currentUserState = atom({
  key: "userData",
  default: null,
});

export const currentUserUidState = selector({
  key: "currentUserUidState",
  get: ({ get }) => {
    const obj = get(currentUserState);
    return obj.uid;
  },
});

export const usersDisplayNameState = atom({
  key: "usersDisplayName",
  default: {},
});

// 05121957 추가
export const usersPhotoState = atom({
  key: "usersPhotoState",
  default: {},
});


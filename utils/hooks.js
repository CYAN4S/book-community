import { atom, selector, useRecoilState } from "recoil";
import { authService as auth } from "../firebaseConfig";
import { useState, useEffect } from "react";

export const currentUserState = atom({
  key: "userData",
  default: {},
});

export const currentUserUidState = selector({
  key: "currentUserUidState",
  get: ({ get }) => {
    const obj = get(currentUserState);
    return obj.uid;
  },
});

export const usersDataState = atom({
  key: "usersDisplayName",
  default: {},
});



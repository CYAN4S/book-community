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
  key: "usersDisplayNameName",
  default: {},
});

// 05121957 추가
export const usersPhotoState = atom({
  key: "usersPhotoState",
  default: {},
});

/**
 * 사용자가 이미지를 선택할 때 사용
 * @param {string} initialState 초기 이미지
 * @returns {[string, (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void, () => void, React.Dispatch<React.SetStateAction<string>>]} 이미지 파일, `input` 태그의 onChange에 등록할 함수, 이미지 제거 함수, 이미지 파일의 업데이트 함수
 */
export const useImageUploader = (initialState) => {
  const [imageFile, setImageFile] = useState(initialState ?? "");

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImageFile(result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => setImageFile("");

  return [imageFile, onFileChange, clearImage, setImageFile];
};

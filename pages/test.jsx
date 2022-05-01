import { useRecoilValue } from "recoil";
import { currentUserUidState } from "../utils/hooks";

export default function Test() {
  const uid = useRecoilValue(currentUserUidState);
  return <p>{uid}</p>;
}

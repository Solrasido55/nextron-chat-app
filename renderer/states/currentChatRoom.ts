import { atom } from "recoil";

export const currentChatRoomState = atom<string>({
  key: "currentChatRoomState",
  default: "",
});

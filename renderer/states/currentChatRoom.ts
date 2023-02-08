import { atom, selector } from "recoil";

export const currentChatRoomState = atom<string>({
  key: "currentChatRoomState",
  default: "",
});

export const currentChatRoomTitleState = atom<string>({
  key: "currentChatRoomTitleState",
  default: "",
});

export const isChatOpenState = selector({
  key: "isChatOpenState",
  get: ({ get }) => {
    const currentChatRoom = get(currentChatRoomState);
    return currentChatRoom !== "";
  },
});

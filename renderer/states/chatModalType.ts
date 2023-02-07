import { atom, selector } from "recoil";

export const chatModalTypeState = atom<string>({
  key: "chatModalTypeState",
  default: "",
});

export const isChatModalOpenState = selector({
  key: "isChatModalOpenState",
  get: ({ get }) => {
    const chatModalType = get(chatModalTypeState);
    return chatModalType.length !== 0;
  },
});

import { atom } from "recoil";

export const isAuthModalOpenState = atom<boolean>({
  key: "isAuthModalOpenState",
  default: false,
});

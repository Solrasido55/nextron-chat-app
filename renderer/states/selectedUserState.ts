import { atom } from "recoil";

export const selectedUserState = atom<IUser>({
  key: "selectedUserState",
  default: null,
});

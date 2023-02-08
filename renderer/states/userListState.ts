import { atom } from "recoil";

export const userListState = atom<IUser[]>({
  key: "userListState",
  default: null,
});

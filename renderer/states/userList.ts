import { atom, selector } from "recoil";
import { currentUserState } from "./currentUser";

export const userListState = atom<IUser[]>({
  key: "userListState",
  default: null,
});

export const filteredUserListState = selector({
  key: "filteredUserListState",
  get: ({ get }) => {
    const userList = get(userListState);
    const currentUser = get(currentUserState);

    return userList?.filter(user => user.uid !== currentUser) || [];
  },
});

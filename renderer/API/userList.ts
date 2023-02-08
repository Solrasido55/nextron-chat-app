import { onValue, ref } from "firebase/database";
import { auth, database } from "./firebase";
import { SetterOrUpdater } from "recoil";

export const getUserList = (setUserList: SetterOrUpdater<IUser[]>) => {
  const userRef = ref(database, "/users");
  onValue(userRef, snapshot => {
    const data: IUser[] = snapshot.val();
    const filteredData = Object.values(data).filter(
      (user: IUser) => user.uid !== auth.currentUser.uid
    );
    if (filteredData) {
      setUserList(filteredData);
    }
  });
};

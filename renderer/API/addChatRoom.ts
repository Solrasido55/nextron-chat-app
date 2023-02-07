import { database } from "./firebase";
import { ref, set } from "firebase/database";

export const addChatRoom = async (chatGroup: IUser[]) => {
  const chatGroupId = chatGroup
    .map(user => user.uid)
    .sort()
    .join("");
  const chatRoomRef = ref(database, "chatRooms/" + chatGroupId);
  set(chatRoomRef, { users: chatGroup.sort() });
};

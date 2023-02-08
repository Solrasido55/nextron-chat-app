import { onValue, ref, set, update } from "firebase/database";
import React from "react";
import { auth, database } from "./firebase";

export const makeMessageRef = (currentChatRoom: string) => {
  return ref(database, "messages/" + currentChatRoom);
};

const createMessageKey = (uid: string) => {
  const randomNumber = Math.random().toString().substring(2);
  return uid + randomNumber;
};

const createMessageField = (message: string) => {
  const { uid, email } = auth.currentUser;
  const now = new Date();
  const createdAt = now.toISOString();
  const messageKey = createMessageKey(uid);
  const messageField = {
    key: messageKey,
    uid,
    email,
    message,
    createdAt,
  };
  return { [messageKey]: messageField };
};

export const setMessageData = (message: string, currentChatRoom: string) => {
  const newMessage = createMessageField(message);
  const messageRef = makeMessageRef(currentChatRoom);
  set(messageRef, newMessage).then(() => console.log("set success"));
};

export const updateMessageData = (message: string, currentChatRoom: string) => {
  const newMessage = createMessageField(message);
  const messageRef = makeMessageRef(currentChatRoom);
  update(messageRef, newMessage).then(() => console.log("update success"));
};

export const sendMessage = (
  previousMessages: MessageField[],
  message: string,
  currentChatRoom: string
) => {
  if (previousMessages !== null) {
    updateMessageData(message, currentChatRoom);
  } else {
    setMessageData(message, currentChatRoom);
  }
};

export const getMessages = (
  currentChatRoom: string,
  setPreviousMessages: (value: React.SetStateAction<MessageField[]>) => void
) => {
  const messageRef = makeMessageRef(currentChatRoom);
  onValue(messageRef, snapshot => {
    const data: MessageField[] = snapshot.val();
    if (data) {
      const orderedByTime: MessageField[] = Object.values(data).sort(
        (a: MessageField, b: MessageField) =>
          a.createdAt > b.createdAt ? -1 : 1
      );
      setPreviousMessages(orderedByTime);
    }
  });
};

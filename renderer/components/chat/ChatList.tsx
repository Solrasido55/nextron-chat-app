import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../API/firebase";
import AddChat from "../AddChat";
import Chat from "./Chat";

const ChatList = () => {
  const [chatList, setChatList] = useState<any[]>([]);
  const currentUser = auth.currentUser.uid;

  const getChatList = () => {
    const chatRoomRef = ref(database, "chatRooms/");
    onValue(chatRoomRef, snapshot => {
      const data = snapshot.val();
      const filteredChatList = Object.entries(data)
        .filter(data => data[0].includes(currentUser))
        .map(data => {
          const { users } = data[1] as any;
          const usersWithOutCurrent: IUser[] = users.filter(
            (user: IUser) => user.uid !== currentUser
          );
          return { key: data[0], users: usersWithOutCurrent };
        });
      setChatList(filteredChatList);
    });
  };

  useEffect(() => {
    getChatList();
  }, []);
  return (
    <>
      <StHeader>
        <StTitle>채팅 목록</StTitle>
        <AddChat />
      </StHeader>
      <StBody>
        <StChatList>
          {chatList?.map(chatRoom => {
            return <Chat key={chatRoom.key} chatRoom={chatRoom} />;
          })}
        </StChatList>
      </StBody>
    </>
  );
};

const StHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px 0 110px;
  border-bottom: 1px solid #e2e2e2;
`;

const StTitle = styled.h4``;

const StBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0 0 100px;
  overflow: scroll;
`;

const StChatList = styled.ul`
  width: 100%;
`;

export default ChatList;

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import { onValue, ref } from "firebase/database";
import { database } from "../../API/firebase";
import { currentChatRoomState } from "../../states/currentChatRoom";
import { currentUserState } from "../../states/currentUser";
import AddChat from "../AddChat";
import Chat from "./Chat";

const ChatList = () => {
  const [chatList, setChatList] = useState<any[]>([]);
  const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
  const currentUser = useRecoilValue(currentUserState);

  const getChatList = () => {
    const chatRoomRef = ref(database, "chatRooms/");
    onValue(chatRoomRef, snapshot => {
      const data = snapshot.val();
      const filteredChatList = Object.entries(data)
        .filter(data => data[0].includes(currentUser))
        .map(data => {
          const { users } = data[1] as any;
          const usersWithOutCurrent = users.filter(
            user => user.uid !== currentUser
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
            const selectChatRoom = () => {
              setCurrentChatRoom(chatRoom.key);
            };
            return (
              <Chat
                key={chatRoom.key}
                email={chatRoom.users.map(user => user.email).join(", ")}
                selectChatRoom={selectChatRoom}
              />
            );
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
  overflow: hidden;
`;

const StChatList = styled.ul`
  width: 100%;
`;

export default ChatList;

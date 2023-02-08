import styled from "@emotion/styled";
import React from "react";
import { useSetRecoilState } from "recoil";
import {
  currentChatRoomState,
  currentChatRoomTitleState,
} from "../../states/currentChatRoom";

const Chat = ({ chatRoom }) => {
  const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
  const setCurrentChatRoomTitle = useSetRecoilState(currentChatRoomTitleState);

  const chatRoomTitle = chatRoom.users.map(user => user.email).join(", ");

  const selectChatRoom = () => {
    setCurrentChatRoom(chatRoom.key);
    setCurrentChatRoomTitle(chatRoomTitle);
  };

  return <StChat onClick={selectChatRoom}>{chatRoomTitle}</StChat>;
};

const StChat = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

export default Chat;

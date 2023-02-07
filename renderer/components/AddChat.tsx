import React from "react";
import addChat from "public/images/icons/addchat.png";
import Image from "next/image";
import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { auth, fireStore } from "../API/firebase";
import { useSetRecoilState } from "recoil";
import { chatModalTypeState } from "../states/chatModalType";

const AddChat = () => {
  const setChatModalType = useSetRecoilState(chatModalTypeState);
  const addChatRoom = () => {
    setChatModalType("group");
  };
  return (
    <StAddChat onClick={addChatRoom}>
      <Image src={addChat} width={25} height={25} alt="add chat" />
    </StAddChat>
  );
};

const StAddChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2;
  }
`;

export default AddChat;

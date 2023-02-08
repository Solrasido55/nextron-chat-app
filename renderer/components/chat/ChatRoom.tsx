import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  currentChatRoomState,
  currentChatRoomTitleState,
} from "../../states/currentChatRoom";
import close from "public/images/icons/close.png";
import Image from "next/image";
import Message from "./Message";
import { sendMessage, getMessages } from "../../API/message";

const ChatRoom = () => {
  const [previousMessages, setPreviousMessages] =
    useState<MessageField[]>(null);
  const message = useRef<string>();
  const messageInputRef = useRef<HTMLInputElement>();
  const chatRoomTitle = useRecoilValue(currentChatRoomTitleState);
  const closeChatRoom = useResetRecoilState(currentChatRoomState);
  const currentChatRoom = useRecoilValue(currentChatRoomState);

  const handleMessageInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    message.current = value;
  };

  const clearMessageInput = () => {
    messageInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(previousMessages, message.current, currentChatRoom);
    clearMessageInput();
  };

  useEffect(() => {
    messageInputRef.current.focus();
    getMessages(currentChatRoom, setPreviousMessages);
  }, []);

  return (
    <StBackground>
      <StHeader>
        <StTitle>{chatRoomTitle}</StTitle>
        <StClose onClick={closeChatRoom}>
          <Image src={close} alt="close" width={15} height={15} />
        </StClose>
      </StHeader>
      <StBody>
        <StMessageWrap>
          {previousMessages?.map(messageField => {
            return (
              <Message key={messageField.key} messageField={messageField} />
            );
          })}
        </StMessageWrap>
      </StBody>
      <StMessageForm onSubmit={handleSubmit}>
        <StMessageInput
          onChange={handleMessageInputValue}
          ref={messageInputRef}
        />
        <StMessageBtn type="submit">전송</StMessageBtn>
      </StMessageForm>
    </StBackground>
  );
};

const StBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 5;
`;

const StHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px 0 110px;
  border-bottom: 1px solid #e2e2e2;
  background-color: white;
  z-index: 5;
`;

const StTitle = styled.h4`
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StClose = styled.div`
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

const StBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0 90px 100px;
  overflow: scroll;
`;

const StMessageWrap = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column-reverse;
  padding: 50px 20px 0;
`;

const StMessageForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px 20px 20px 120px;
  border-top: 1px solid #e2e2e2;
  background-color: white;
`;

const StMessageInput = styled.input`
  width: 87%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StMessageBtn = styled.button`
  width: 10%;
  height: 50px;
  background-color: gray;
  border: none;
  border-radius: 5px;
  color: white;
  opacity: 0.9;
  &:hover {
    opacity: 1;
    scale: 0.99;
  }
`;
export default ChatRoom;

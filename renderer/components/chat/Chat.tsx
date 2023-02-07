import styled from "@emotion/styled";
import React from "react";

const Chat = ({ email, selectChatRoom }) => {
  return <StChat onClick={selectChatRoom}>{email}</StChat>;
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

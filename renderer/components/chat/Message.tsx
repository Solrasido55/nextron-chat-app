import React from "react";
import styled from "@emotion/styled";
import { auth } from "../../API/firebase";

const Message = ({ messageField }) => {
  const currentUser = auth.currentUser.uid;

  const { uid, email, message, createdAt } = messageField;
  const isCurrentUser = uid === currentUser;

  const date = new Date(createdAt);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <StMessage isCurrentUser={isCurrentUser}>
      <StContent>
        <StSender isCurrentUser={isCurrentUser}>
          {isCurrentUser ? "me" : email}
        </StSender>
        <StBubble isCurrentUser={isCurrentUser}>{message}</StBubble>
        <StTime isCurrentUser={isCurrentUser}>{`${hour}:${
          minute > 10 ? minute : "0" + minute
        }`}</StTime>
      </StContent>
    </StMessage>
  );
};

const StMessage = styled.li<{ isCurrentUser: boolean }>`
  display: flex;
  justify-content: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  width: 100%;
  align-items: center;
  margin: 20px 0;
`;

const StBubble = styled.div<{ isCurrentUser: boolean }>`
  padding: 15px 20px;
  border-radius: 5px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#e2e2e2" : "gray"};
  color: ${({ isCurrentUser }) => (isCurrentUser ? null : "white")};
`;

const StContent = styled.div`
  position: relative;
`;

const StSender = styled.span<{ isCurrentUser: boolean }>`
  position: absolute;
  left: ${({ isCurrentUser }) => (isCurrentUser ? null : 0)};
  right: ${({ isCurrentUser }) => (isCurrentUser ? 0 : null)};
  top: -18px;
  font-size: 15px;
`;

const StTime = styled.span<{ isCurrentUser: boolean }>`
  position: absolute;
  right: ${({ isCurrentUser }) => (isCurrentUser ? null : "-35px")};
  left: ${({ isCurrentUser }) => (isCurrentUser ? "-35px" : null)};
  bottom: 0;
  font-size: 12px;
`;

export default Message;

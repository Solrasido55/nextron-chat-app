import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { chatModalTypeState } from "../../states/chatModalType";
import { selectedUserState } from "../../states/selectedUserState";
import { userListState } from "../../states/userListState";
import { auth } from "../../API/firebase";
import { addChatRoom } from "../../API/addChatRoom";
import {
  currentChatRoomState,
  currentChatRoomTitleState,
} from "../../states/currentChatRoom";
// import { currentUserState } from "../../states/currentUser";

const AddChatModal = () => {
  const currentUser = auth.currentUser.uid;
  const [chatGroup, setChatGroup] = useState<IUser[]>([
    { email: auth.currentUser.email, uid: currentUser },
  ]);
  const closeModal = useResetRecoilState(chatModalTypeState);
  const chatModalType = useRecoilValue(chatModalTypeState);
  const selectedUser = useRecoilValue(selectedUserState);
  const userList = useRecoilValue(userListState);
  const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
  const setCurrentChatRoomTitle = useSetRecoilState(currentChatRoomTitleState);

  const isPrivate = chatModalType === "private";

  const startChat = () => {
    addChatRoom(chatGroup);
    setCurrentChatRoomTitle(
      chatGroup
        .filter(user => user.uid !== currentUser)
        .map(user => user.email)
        .join(", ")
    );
    setCurrentChatRoom(
      chatGroup
        .map(user => user.uid)
        .sort()
        .join("")
    );
    closeModal();
  };

  const inviteUser = (user: IUser) => {
    setChatGroup(users => {
      return [...users, user];
    });
  };

  const cancelInvite = (user: IUser) => {
    setChatGroup(users => users.filter(invited => invited !== user));
  };

  const handleInvited = (user: IUser) => {
    if (chatGroup.includes(user)) {
      cancelInvite(user);
    } else {
      inviteUser(user);
    }
  };

  useEffect(() => {
    if (isPrivate) {
      setChatGroup([
        { email: auth.currentUser.email, uid: currentUser },
        selectedUser,
      ]);
    }
  }, []);

  return (
    <StBackground onClick={closeModal}>
      <StModal onClick={e => e.stopPropagation()}>
        {isPrivate ? (
          <StContent>{selectedUser.email}</StContent>
        ) : (
          <StContent>
            {userList?.map(user => (
              <StUser
                key={user.uid}
                selected={chatGroup.includes(user)}
                onClick={() => {
                  handleInvited(user);
                }}>
                {user.email}
              </StUser>
            ))}
          </StContent>
        )}
        <StButtonWrap>
          <StConfirmButton onClick={startChat}>
            {isPrivate ? "1:1??????" : "????????????"}
          </StConfirmButton>
          <StCancelButton onClick={closeModal}>??????</StCancelButton>
        </StButtonWrap>
      </StModal>
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
  z-index: 999;
`;

const StModal = styled.div`
  width: 300px;
  min-height: 150px;
  max-height: 500px;
  padding: 50px 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 3px darkgray;
`;

const StContent = styled.div`
  width: 100%;
  min-height: 50px;
  max-height: 300px;
  text-align: center;
  overflow: scroll;
`;

const StUser = styled.p<{ selected: boolean }>`
  width: 100%;
  margin: 10px 0 40px 0;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "gray" : null)};
  color: ${({ selected }) => (selected ? "white" : null)};
`;

const StButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StConfirmButton = styled.button`
  width: 100px;
  height: 25px;
  background-color: #ce3a3a;
  color: white;
  border: none;
  border-radius: 5px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const StCancelButton = styled.button`
  width: 100px;
  height: 25px;
  background-color: darkgray;
  color: white;
  border: none;
  border-radius: 5px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export default AddChatModal;

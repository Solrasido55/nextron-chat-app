import styled from "@emotion/styled";
import React from "react";
import { useResetRecoilState } from "recoil";
import { isAuthModalOpenState } from "../../states/isAuthModalOpen";

interface ModalProps {
  text: string;
  confirm?: () => void;
}

const Modal = ({ text, confirm }: ModalProps) => {
  const closeModal = useResetRecoilState(isAuthModalOpenState);

  const handleConfirm = () => {
    if (confirm !== undefined) confirm();
    closeModal();
  };

  return (
    <StBackground onClick={closeModal}>
      <StModal onClick={e => e.stopPropagation()}>
        <StContent>{text}</StContent>
        <StButtonWrap>
          <StConfirmButton onClick={handleConfirm}>확인</StConfirmButton>
          <StCancelButton onClick={closeModal}>취소</StCancelButton>
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
  height: 150px;
  padding: 50px 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 3px darkgray;
`;

const StContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
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

export default Modal;

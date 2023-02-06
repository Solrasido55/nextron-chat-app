import React from "react";
import addChat from "public/images/icons/addchat.png";
import Image from "next/image";
import styled from "@emotion/styled";

const AddChat = () => {
  return (
    <StAddChat>
      <Image src={addChat} width={25} height={25} alt="add chat" />
    </StAddChat>
  );
};

const StAddChat = styled.div`
  cursor: pointer;
`;

export default AddChat;

import React, { useState } from "react";
import Head from "next/head";
import AuthForm from "../../components/AuthForm";
import styled from "@emotion/styled";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isModalOpenState } from "../../states/isModalOpen";
import Modal from "../../components/Modal";
import AlertToast from "../../components/AlertToast";
import {
  errorCodeState,
  isAlertToastPopState,
} from "../../states/alertMessage";
import { useRouter } from "next/router";

const Next = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const isModalOpen = useRecoilValue(isModalOpenState);
  const setErrorCode = useSetRecoilState(errorCodeState);
  const isAlertToastPop = useRecoilValue(isAlertToastPopState);

  const router = useRouter();

  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(userInfo => {
      return { ...userInfo, [name]: value };
    });
  };

  const signUp = () => {
    const { email, password } = userInfo;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/login");
      })
      .catch(error => {
        const errorCode = error.code;
        setErrorCode(errorCode);
      });
  };

  return (
    <>
      <Head>
        <title>SIGN UP</title>
      </Head>
      {isModalOpen && <Modal text="가입하시겠습니까?" confirm={signUp} />}
      {isAlertToastPop && <AlertToast />}
      <StBody>
        <StHeader>Sign Up</StHeader>
        <AuthForm
          handleUserInfo={handleUserInfo}
          currentPage="Sign Up"
          userInfo={userInfo}
        />
      </StBody>
    </>
  );
};

const StHeader = styled.h1`
  font-size: 50px;
`;

const StBody = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

export default Next;

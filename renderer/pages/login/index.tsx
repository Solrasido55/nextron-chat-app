import React, { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import AuthForm from "../../components/AuthForm";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Modal from "../../components/Modal";
import AlertToast from "../../components/AlertToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isModalOpenState } from "../../states/isModalOpen";
import {
  errorCodeState,
  isAlertToastPopState,
} from "../../states/alertMessage";
import { store } from "../../utils/electronStore";
import { useRouter } from "next/router";

interface UserWithAccessToken extends User {
  accessToken?: string;
}

const Login = () => {
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

  const signIn = () => {
    const { email, password } = userInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user: UserWithAccessToken = userCredential.user;
        store.set("accessToken", user.accessToken);
        router.push("/home");
      })
      .catch(error => {
        const errorCode = error.code;
        setErrorCode(errorCode);
        setUserInfo({
          email: "",
          password: "",
        });
      });
  };

  return (
    <>
      <Head>
        <title>LOG IN</title>
      </Head>
      {isModalOpen && <Modal text="로그인 하시겠습니까?" confirm={signIn} />}
      {isAlertToastPop && <AlertToast />}
      <StBody>
        <StHeader>Chat App</StHeader>
        <AuthForm
          handleUserInfo={handleUserInfo}
          currentPage="Login"
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

export default Login;

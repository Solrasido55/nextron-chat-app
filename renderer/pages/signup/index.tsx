import React, { useState } from "react";
import Head from "next/head";
import AuthForm from "../../components/auth/AuthForm";
import styled from "@emotion/styled";
import { auth, database } from "../../API/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthModalOpenState } from "../../states/isAuthModalOpen";
import Modal from "../../components/auth/AuthModal";
import AlertToast from "../../components/AlertToast";
import {
  errorCodeState,
  isAlertToastPopState,
} from "../../states/alertMessageState";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";

const Next = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const isAuthModalOpen = useRecoilValue(isAuthModalOpenState);
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
      .then(user => {
        set(ref(database, "users/" + user.user.uid), {
          email: email,
          uid: user.user.uid,
        });
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
      {isAuthModalOpen && <Modal text="가입하시겠습니까?" confirm={signUp} />}
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

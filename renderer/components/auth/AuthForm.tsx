import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { isModalOpenState } from "../../states/isModalOpen";

const AuthForm = ({ currentPage, handleUserInfo, userInfo }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const { email, password } = userInfo;

  const openModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const isLogin = currentPage === "Login";

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <StForm onSubmit={openModal}>
      <StInputWrap>
        <label>Email</label>
        <StInput
          type="text"
          name="email"
          ref={inputRef}
          value={email}
          onChange={handleUserInfo}
        />
      </StInputWrap>
      <StInputWrap>
        <label>Password</label>
        <StInput
          type="password"
          name="password"
          value={password}
          onChange={handleUserInfo}
        />
      </StInputWrap>
      <StButton type="submit">{currentPage}</StButton>
      <StFooter>
        {isLogin ? (
          <p>
            회원이 아니신가요? <Link href="/signup">회원가입</Link>
          </p>
        ) : (
          <p>
            이미 가입하셨나요? <Link href="/login">로그인</Link>
          </p>
        )}
      </StFooter>
    </StForm>
  );
};

const StForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: none;
  padding: 0 5px;
  &:focus {
    border: 1px solid skyblue;
  }
`;

const StInputWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const StButton = styled.button`
  width: 200px;
  height: 30px;
  margin: 20px 0;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: gray;
  &:hover {
    background-color: black;
  }
`;

const StFooter = styled.footer`
  width: 100%;
  text-align: right;
  margin: 10px 0;
`;

export default AuthForm;

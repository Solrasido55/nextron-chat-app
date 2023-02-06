import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alertMessageState, errorCodeState } from "../states/alertMessage";

const AlertToast = () => {
  const alertMessage = useRecoilValue(alertMessageState);
  const setErrorCode = useSetRecoilState(errorCodeState);
  const [isMounting, setIsMounting] = useState<boolean>(true);

  const closeToast = () => {
    setIsMounting(false);
    setTimeout(() => {
      setErrorCode("");
    }, 800);
  };

  useEffect(() => {
    setTimeout(closeToast, 3000);
  }, []);

  return <StToast isMounting={isMounting}>{alertMessage}</StToast>;
};

const mountAnimation = keyframes`
0%{
  transform : translateX(400px)
}
100% {
  transform : translateX(0);
}
`;

const unmountAnimation = keyframes`
0%{
  transform : translateX(0);
}
100% {
  transform : translateX(400px);
}
`;

const StToast = styled.div<{ isMounting: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 20px;
  width: 250px;
  height: 70px;
  background-color: yellow;
  z-index: 99999;
  animation: ${({ isMounting }) =>
      isMounting ? mountAnimation : unmountAnimation}
    0.8s;
`;

export default AlertToast;

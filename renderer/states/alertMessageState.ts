import { atom, selector } from "recoil";

export const errorCodeState = atom<string>({
  key: "errorCodeState",
  default: "",
});

export const alertMessageState = selector({
  key: "alertMessageState",
  get: ({ get }) => {
    const code = get(errorCodeState);

    switch (code) {
      case "auth/user-not-found":
        return "가입되지 않은 계정입니다.";
      case "auth/invalid-email":
        return "유효하지 않은 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6자 이상 입력해주세요";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 가입되어있는 계정입니다.";
    }
  },
});

export const isAlertToastPopState = selector({
  key: "isAlertToastPopState",
  get: ({ get }) => {
    const code = get(errorCodeState);
    return code.length !== 0;
  },
});

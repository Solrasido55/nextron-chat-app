import { css } from "@emotion/react";

const global = css`
  body {
    position: relative;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    color: black;
    opacity: 0.5;
  }

  input,
  button {
    outline: none;
    cursor: pointer;
  }
`;

export default global;

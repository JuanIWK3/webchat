import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

.modal-content {
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textPrimary};
}

#image {
  border: 2px solid rgb(106, 106, 106);
  border-radius: 50%;
}
`;

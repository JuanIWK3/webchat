import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textPrimary};

  div {
    width: 100%;
    max-width: 400px;

    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  form {
    width: 100%;
    text-align: left;
  }
`;

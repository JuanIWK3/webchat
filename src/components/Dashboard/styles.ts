import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textPrimary};

  div {
    width: 100%;
    max-width: 400px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .nav-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    position: relative;

    h2 {
      position: absolute;
      left: 50%;

      transform: translate(-50%);
    }

    div { 
      width: 50px
    }
  }

  
  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;

    .profile-image {
      background: linear-gradient(-90deg, #33b7e2, #5e62b0, #dc307c);
      padding: 0.3rem;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;

      div {
        height: 8rem;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
    }
  }
`
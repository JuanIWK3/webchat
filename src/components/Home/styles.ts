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

  #btn-outline {
    display: flex;
    justify-content: space-between;
    margin: 4px;
    text-decoration: none;
    overflow: hidden;
    background-image: none;
    backdrop-filter: blur(0px);

    div {
      display: flex;

      div {
        display: flex;
        flex-direction: column;
        text-align: left;

        .h6 {
          margin-bottom: 5px;
          padding: 0;
        }
      }
    }
  }

  #button {
    padding: 5px;
  }

  main {
    display: flex;
    width: 100%;
    height: 100%;

    .chat {
      width: 100%;
      height: 100%;

      .card-body {
        #chat-wrapper {
          max-height: 74vh;
          overflow: auto;

          &::-webkit-scrollbar {
            width: 5px;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            -webkit-border-radius: 10px;
            border-radius: 10px;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: rgba(39, 39, 39, 0.8);
          }
          &::-webkit-scrollbar-thumb:window-inactive {
            background: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .message-wrapper {
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }

      #other-users-message-wrapper {
        justify-content: flex-start;
      }

      .message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px 8px 16px;
        background-color: #09ff003a;
        border: 1px solid rgba(0, 255, 8, 0.172);
        border-radius: 0.5rem;
        margin-bottom: 8px;

        p {
          margin: 0;
          padding: 0;
        }
      }

      #name {
        color: black;
      }

      #other-users-message {
        background-color: #0000002f;
        color: rgb(0, 0, 0);
        border: 1px solid rgba(0, 255, 8, 0);

        #name {
          color: rgb(229, 255, 0);
        }
      }
      #message-input {
        background-color: ${(props) => props.theme.colors.primary};
        border: 1px solid ${(props) => props.theme.colors.textSecondary};
        color: ${(props) => props.theme.colors.textPrimary};
      }
    }
  }
`;

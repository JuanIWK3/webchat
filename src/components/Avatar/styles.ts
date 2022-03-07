import styled from "styled-components";

export const Container = styled.div`
  height: 64px;
  width: 64px;

  .image-wrapper {
    margin: 0px 16px 16px 16px;
    position: relative;

    div {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
      position: relative;

      &::before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0;

        background-color: rgba(0, 0, 0, 0.116);
        color: rgb(255, 255, 255);
        text-align: center;
        border-radius: 5px;
        padding: 5px;
        transition: opacity 0.5s ease-in-out;

        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover::before {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

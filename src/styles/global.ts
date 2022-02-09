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

#image {
  border: 2px solid rgb(106, 106, 106);
  border-radius: 50%;
}

.image-hover {
  &::before {
    content: attr(data-hover);
    visibility: hidden;
    opacity: 0;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.116);
    color: rgb(255, 255, 255);
    text-align: center;
    border-radius: 5px;
    padding: 5px 5px;
    transition: opacity 1s ease-in-out;

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
`


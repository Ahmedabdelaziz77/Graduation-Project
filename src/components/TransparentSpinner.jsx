import styled, { keyframes } from "styled-components";

// Spinner rotation animation
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

// Spinner visual style
const Spinner = styled.div`
  width: 64px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #14b8a6 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #14b8a6);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

// Full screen transparent overlay
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6); /* semi-transparent white */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

function TransparentSpinner() {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
}

export default TransparentSpinner;

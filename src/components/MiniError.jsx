import styled, { keyframes } from "styled-components";
import { BiError } from "react-icons/bi";

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
`;

const MiniError = styled(BiError)`
  width: 2.4rem;
  height: 2.4rem;
  color: red;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export default MiniError;

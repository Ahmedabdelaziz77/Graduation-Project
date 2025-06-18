import styled, { keyframes } from "styled-components";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-6px);
    opacity: 0.6;
  }
`;

const AnimatedIcon = styled(AiOutlineExclamationCircle)`
  width: 4rem;
  height: 4rem;
  color: #2196f3;
  animation: ${bounce} 1.5s infinite ease-in-out;
`;

function MiniEmpty({ whatIsEmpty, WhatToDo }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full text-center text-gray-600">
      <AnimatedIcon className="mb-4" />
      <h2 className="text-xl font-semibold mb-2">{whatIsEmpty}</h2>
      <p className="text-sm">{WhatToDo}</p>
    </div>
  );
}

export default MiniEmpty;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled, { keyframes } from 'styled-components';

const GlowingEyes = () => {
  return (
    <EyesContainer>
      <Eye className='left' />
      <Eye className='right' />
    </EyesContainer>
  );
};

export default GlowingEyes;

// Animations
const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(217, 70, 239, 0.8),
      0 0 40px rgba(217, 70, 239, 0.6),
      0 0 60px rgba(217, 70, 239, 0.4),
      0 0 80px rgba(217, 70, 239, 0.2);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(217, 70, 239, 1),
      0 0 60px rgba(217, 70, 239, 0.8),
      0 0 90px rgba(217, 70, 239, 0.6),
      0 0 120px rgba(217, 70, 239, 0.4);
  }
`;

const subtleBlink = keyframes`
  0%, 90%, 100% {
    transform: scaleY(1);
    opacity: 1;
  }
  95% {
    transform: scaleY(0.1);
    opacity: 0.5;
  }
`;

// Styled Components
const EyesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 120px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const Eye = styled.div`
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  animation:
    ${pulseGlow} 3s ease-in-out infinite,
    ${subtleBlink} 8s ease-in-out infinite;

  &.left {
    transform: rotate(-10deg);
  }

  &.right {
    transform: rotate(10deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background: radial-gradient(
      ellipse at center,
      #f0abfc 0%,
      #d946ef 50%,
      transparent 70%
    );
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    filter: blur(8px);
  }
`;

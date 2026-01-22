// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface GlowingEyesProps {
  backgroundImageName?: string;
  backgroundTop?: string;
  backgroundRight?: string;
  backgroundOpacity?: number;
}

const GlowingEyes: React.FC<GlowingEyesProps> = ({
  backgroundImageName,
  backgroundTop = '0',
  backgroundRight = '0',
  backgroundOpacity = 1,
}) => {
  // Generate srcset for responsive images
  const getSrcSet = (imageName: string) => {
    const basePath = imageName.substring(0, imageName.lastIndexOf('.'));
    const extension = imageName.substring(imageName.lastIndexOf('.'));
    return `${basePath}${extension} 1x, ${basePath}@2x${extension} 2x, ${basePath}@3x${extension} 3x`;
  };

  return (
    <EyesContainer>
      {backgroundImageName && (
        <BackgroundImage
          src={backgroundImageName}
          srcSet={getSrcSet(backgroundImageName)}
          alt=''
          $top={backgroundTop}
          $right={backgroundRight}
          $opacity={backgroundOpacity}
        />
      )}
      <EyesWrapper>
        <Eye className='left' />
        <Eye className='right' />
      </EyesWrapper>
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

const blinkLeft = keyframes`
  0%, 90%, 100% {
    transform: rotate(-8deg) scaleY(1);
    opacity: 1;
  }
  95% {
    transform: rotate(-8deg) scaleY(0.1);
    opacity: 0.5;
  }
`;

const blinkRight = keyframes`
  0%, 90%, 100% {
    transform: scaleX(-1) rotate(-8deg) scaleY(1);
    opacity: 1;
  }
  95% {
    transform: scaleX(-1) rotate(-8deg) scaleY(0.1);
    opacity: 0.5;
  }
`;

// Styled Components
const EyesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.img<{
  $top: string;
  $right: string;
  $opacity: number;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  opacity: ${(props) => props.$opacity};
  width: 100%;
  height: auto;
  display: block;
`;

const EyesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  z-index: 2;
  pointer-events: none;
`;

const Eye = styled.div`
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%);
  border-radius: 30% 100% 80% 50% / 40% 100% 30% 90%;
  position: relative;

  &.left {
    animation:
      ${pulseGlow} 3s ease-in-out infinite,
      ${blinkLeft} 5s ease-in-out infinite;
  }

  &.right {
    animation:
      ${pulseGlow} 3s ease-in-out infinite,
      ${blinkRight} 5s ease-in-out infinite;
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

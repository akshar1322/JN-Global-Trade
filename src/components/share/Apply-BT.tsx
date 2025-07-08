import React from 'react';
import styled from 'styled-components';
import { HiArrowCircleRight } from "react-icons/hi";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

const ApplyButton: React.FC<ButtonProps> = ({
  label = 'inquiry',
  icon = <HiArrowCircleRight size={32} />,
  onClick,
  className,
  ...rest
}) => {
  return (
    <StyledWrapper className={className}>
      <button className="button" onClick={onClick} {...rest}>
        {label}
        {icon && <span className="icon">{icon}</span>}
      </button>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: rgba(0, 123, 255, 1);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
  text-transform: uppercase;
  }

  .icon {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  .button:hover .icon {
    transform: translateX(4px);
  }

  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }
`;

export default ApplyButton;

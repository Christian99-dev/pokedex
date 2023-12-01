import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { responsiveCSS } from "@/theme/responsive";


const Button = ({ text, route }: { text: string; route: string }) => {
  return (
    <LinkWrapper href={route} passHref>
      <div className="fill"></div>
      <button>{text}</button>
    </LinkWrapper>
  );
};

export default Button;

const LinkWrapper = styled(Link)`
  position: relative;
  button{
    position: relative;
    z-index: 2;
    background-color: transparent;
    border: 3px solid var(--pink);
    padding: 10px 0;
    color: white;
    font-size: var(--fs-3);
    color: var(--pink);
    font-weight: 600;
    border-radius: 8px;
    ${responsiveCSS("width", 260,240,220,200,190,180)}
    cursor: pointer; 
    transition: all 0.3s ease;
  } 

  .fill{
    position: absolute;
    z-index:1;
    width: 0%;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: var(--pink);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  &:hover {
    .fill{
      width: 100%;
      transition: all 0.3s ease;
    }
    
    button{
      color: var(--dark);
      transition: all 0.3s ease;
    }
  }
`


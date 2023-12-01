import React from "react";
import styled from "styled-components";
import Link from "next/link";


const Button = ({ text, route }: { text: string; route: string }) => {
  return (
    <Link href={route} passHref>
      <ButtonWrapper>{text}</ButtonWrapper>
    </Link>
  );
};

export default Button;

const ButtonWrapper = styled.button`
background-color: darkblue;
padding: 10px;
color: white;
border: none;
font-size: var(--fs-3);
margin: 0 var(--space-md); /* Added margin between buttons */
border-radius: 8px; /* Added rounded corners */
cursor: pointer; /* Add pointer cursor for better UX */

&:hover {
  background-color: #001f3f; /* Change color on hover */
}
`;
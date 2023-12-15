import React from "react";
import Link from "next/link";
import { useRouter } from "next/router"; 
import styled from "styled-components";

const Header = () => {
  const router = useRouter(); 

  const navigateTo = (route: string) => {
    router.push(route); 
  };

  return (
    <HeaderWrapper>
      <Nav>
        <NavLink onClick={() => navigateTo("/")}>Home</NavLink>
        <NavLink onClick={() => navigateTo("/fight")}>Fight</NavLink>
        <NavLink onClick={() => navigateTo("/pokedex")}>Pokedex</NavLink>
        <NavLink onClick={() => navigateTo("/addPokemon")}>+Add</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: var(--dark-pink);
  padding: 10px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Header;

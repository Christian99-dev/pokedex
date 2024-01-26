import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
    <header>
      <Nav>
        <NavLink onClick={() => navigateTo("/")}>Home</NavLink>
        <NavLink onClick={() => navigateTo("/fight")}>Fight</NavLink>
        <NavLink onClick={() => navigateTo("/pokedex")}>Pokedex</NavLink>
        <NavLink onClick={() => navigateTo("/addPokemon")}>+Add</NavLink>
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  background-color: var(--dark-pink);
  width: 100%;
  display: flex;
  padding: var(--space-xs) 0;
  justify-content: space-around;
`;

const NavLink = styled.a`
  margin: auto 0;
  color: white;
  font-size: var(--fs-4);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default Header;

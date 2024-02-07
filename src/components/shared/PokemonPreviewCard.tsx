import { Pokemon } from "@/context/PokemonContext";
import styled from "styled-components";

const PokedexPreview = ({
  pokemon,
  active,
  onClick,
  innerRef,
}: {
  pokemon: Pokemon;
  active: boolean;
  onClick: () => void;
  innerRef?: any;
}) => {
  const { image, name, id } = pokemon;
  return (
    <PokedexCardWrapper
      ref={innerRef}
      className={active ? "active" : ""}
      onClick={onClick}
    >
      <img className="pokemon-img" src={image} alt={name} />
      <h1 className="name">{name}</h1>
      <h2 className="id">{id}</h2>
    </PokedexCardWrapper>
  );
};

export default PokedexPreview;

const PokedexCardWrapper = styled.div`
  display: flex;
  background-color: var(--pink);
  align-items: center;
  border-radius: 10px;
  padding-right: var(--space-lg);
  gap: var(--space-lg);
  transition: all 0.02s ease-out;
  cursor: pointer;
  height: min-content;

  .name {
    font-size: var(--fs-4);
    font-weight: bold;
  }
  .id {
    font-size: var(--fs-5);
    font-weight: 200;
    margin-left: auto;
  }

  .pokemon-img {
    height: var(--pokemon-img-s);
    width: var(--pokemon-img-s);
    object-fit: cover;
    border-radius: 10px;
  }

  &:hover,
  &.active {
    transition: all 0.08s ease-in;
    background-color: var(--purple);
    color: var(--pink);
  }
`;

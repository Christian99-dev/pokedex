import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Layout from "@/components/shared/Layout";
import TypeSelection from "@/components/shared/TypeSelection";
import { usePokemonContext } from "@/context/PokemonContext";
import { addPokemonToSession } from "@/utils/sessionTools";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const addPokemon = () => {
  const { getNextFreeId, getRandomPokemonImage, isLoading } =
    usePokemonContext();
  const [types, setTypes] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string>("");

  const addCustomPokemon = () => {
    addPokemonToSession({
      id: getNextFreeId(),
      name: name.toUpperCase(),
      types: types,
      image: img,
      description: description === "" ? null : description,
      height: 0,
      weight: 0,
      base_experience: 0,
      capture_rate: 0,
      moves: [{
        type:"normal",
        name:"tackle"
      }]
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setImg(getRandomPokemonImage());
    }
  }, [isLoading]);

  return (
    <Layout>
      <AddPokemonWrapper>
        <h1>Pokemon Hinzufügen</h1>
        <div className="add-section">
          <div className="left">
            {img !== "" ? <img src={img}></img> : <BounceLoader />}
          </div>
          <div className="right">
            <Input
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TypeSelection
              state={types}
              setState={setTypes}
              active={types.length < 2}
            />
          </div>
        </div>
        <Button text="Hinzufügen" route="" onClick={() => addCustomPokemon()} size="medium" />
      </AddPokemonWrapper>
    </Layout>
  );
};

export default addPokemon;

const AddPokemonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--pink);
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);

  h1 {
    font-size: 50px;
    color: var(--dark-pink);
    letter-spacing: 2px;
    margin-bottom: var(--space-xxl);
  }

  .add-section {
    gap: var(--space-xl);
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-xxl);
    width: 50%;

    input {
      width: 100%;
    }

    .left,
    .right {
      flex: 1;
    }

    .right {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }

      span {
        > * {
          background-color: var(--dark-pink) !important;
        }
      }
    }
  }
`;

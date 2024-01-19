import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import TypeSelection from "@/components/TypeSelection";
import React, { useState } from "react";
import styled from "styled-components";

const addPokemon = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [img, setImg] = useState<string>("")
  const onTypesUpdate = (types: string[]) => setTypes(types);
  return (
    <Layout>
      <AddPokemonWrapper>
        <h1>Pokemon Hinzufügen</h1>
        <div className="add-section">
          <div className="left">
            <img src="https://images.pexels.com/photos/4132776/pexels-photo-4132776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          </div>
          <div className="right">
            <Input placeholder="Name" onChange={(e) => {setName(e.target.value)}} />
            <Input placeholder="Description" onChange={(e) => {setDescription(e.target.value)}} />
            <TypeSelection onUpdate={onTypesUpdate} />
          </div>
        </div>
        <Button text="Hinzufügen" route="" />
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
      img {
        height: 200px;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

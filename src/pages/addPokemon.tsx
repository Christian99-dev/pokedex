import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Layout from "@/components/shared/Layout";
import ValueSlider from "@/components/shared/Slider";
import TypeSelection from "@/components/shared/TypeSelection";
import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import pokemonMaxStats from "@/config/pokemonMaxStats";
import { addPokemonToSession } from "@/utils/session";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "@/components/shared/Icon";

const addPokemon = () => {
  const { getNextFreeId, getRandomPokemonImage } = usePokemonContext();
  const [types, setTypes] = useState<string[]>([]);
  const [showImgLoader, setShowImageLoader] = useState(true);
  const [img, setImg] = useState("");

  const [values, setValues] = useState<Pokemon>({
    id: 0,
    name: "",
    types: [],
    image: "",
    description: null,
    height: 0,
    weight: 0,
    base_experience: 0,
    capture_rate: 0,
    moves: [
      {
        type: "normal",
        name: "tackle",
      },
    ],
  });

  const changeValue = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };

  const resetFrom = () => {
    setValues({
      id: 0,
      name: "",
      types: [],
      image: "",
      description: null,
      height: 0,
      weight: 0,
      base_experience: 0,
      capture_rate: 0,
      moves: [
        {
          type: "normal",
          name: "tackle",
        },
      ],
    });
    setTypes([]);
  };

  const addCustomPokemon = () => {
    toast.dismiss();
    let hasErrors = false;
    const nameRegex = /^[a-zA-Z ]+$/;
    const descriptionRegex = /^[a-zA-Z ]*$/;

    /**
     * Name and Description check
     */

    if (
      values.name.length < 3 ||
      values.name.length > 15 ||
      !nameRegex.test(values.name)
    ) {
      toast.error(
        "Der Name muss zwischen 3 und 15 Zeichen lang sein und darf keine Sonderzeichen enthalten!",
        {
          position: "top-right",
          theme: "colored",
        }
      );
      hasErrors = true;
    }

    if (
      values.description &&
      (values.description.length > 30 ||
        !descriptionRegex.test(values.description))
    ) {
      toast.error(
        "Die Beschreibung darf maximal 30 Zeichen lang sein und darf keine Sonderzeichen enthalten!",
        {
          position: "top-right",
          theme: "colored",
        }
      );
      hasErrors = true;
    }

    /**
     * Stats check
     */
    if (values.height === 0) {
      toast.error("Bitte stelle eine Höhe ein!", {
        position: "top-right",
        theme: "colored",
      });
      hasErrors = true;
    }

    if (values.weight === 0) {
      toast.error("Bitte stelle ein Gewicht ein!", {
        position: "top-right",
        theme: "colored",
      });
      hasErrors = true;
    }

    if (values.base_experience === 0) {
      toast.error("Bitte stelle eine Basiserfahrung ein!", {
        position: "top-right",
        theme: "colored",
      });
      hasErrors = true;
    }

    if (values.capture_rate === 0) {
      toast.error("Bitte stelle eine Fangrate ein!", {
        position: "top-right",
        theme: "colored",
      });
      hasErrors = true;
    }

    /**
     * Types check
     */
    if (types.length === 0) {
      toast.error("Bitte vergebe mindestens einen Typen!", {
        position: "top-right",
        theme: "colored",
      });
      hasErrors = true;
    }

    if (hasErrors) return;

    addPokemonToSession({
      ...values,
      id: getNextFreeId(),
      types: types,
      name: values.name.toUpperCase(),
      image: img
    });
    resetFrom();
    generateNewImage();
    toast.success("Pokemon Hinzugefügt!", {
      position: "top-right",
      theme: "colored",
    });
  };

  const generateNewImage = () => {
    setShowImageLoader(true);
    getRandomPokemonImage().then((img) => {
      setImg(img);
      setShowImageLoader(false);
    });
  };

  useEffect(() => {
    generateNewImage();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <AddPokemonWrapper>
        <h1>Pokemon Hinzufügen</h1>
        <div className="add-section">
          <div className="left">
            {!showImgLoader ? (
              <>
                <img src={img}></img>
                <Icon className="dice" iconname="dice.svg" onClick={() => generateNewImage()} />
              </>
            ) : (
              <BounceLoader />
            )}
          </div>
          <div className="right">
            <Input
              className="name"
              value={values.name}
              placeholder="Name"
              onChange={(e) => {
                changeValue("name", e.target.value);
              }}
            />
            <Input
              className="description"
              value={values.description || ""}
              placeholder="Description"
              onChange={(e) => {
                changeValue("description", e.target.value);
              }}
              textarea
            />
            <ValueSlider
              value={values.height}
              placeholder="Höhe"
              onChange={(e) => changeValue("height", e)}
              max={pokemonMaxStats.height}
              className="height"
            />
            <ValueSlider
              value={values.weight}
              placeholder="Gewicht"
              onChange={(e) => changeValue("weight", e)}
              max={pokemonMaxStats.weight}
              className="weight"
            />
            <ValueSlider
              value={values.base_experience}
              placeholder="Basiserfahrung"
              onChange={(e) => changeValue("base_experience", e)}
              max={pokemonMaxStats.base_experience}
              className="base-experience"
            />

            <ValueSlider
              value={values.capture_rate}
              placeholder="Fangrate"
              onChange={(e) => changeValue("capture_rate", e)}
              max={pokemonMaxStats.capture_rate}
              className="capture-rate"
            />
            <TypeSelection
              state={types}
              setState={setTypes}
              active={types.length < 2}
              className="types"
            />
          </div>
        </div>
        <Button
          text="Hinzufügen"
          route=""
          onClick={() => addCustomPokemon()}
          size="medium"
        />
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
      display: grid;
      grid-template-areas:
        "name name"
        "description description"
        "height weight"
        "base-experience capture-rate"
        "types types";
      grid-auto-columns: 1fr;
      gap: var(--space-sm);

      .name {
        grid-area: name;
      }
      .height {
        grid-area: height;
      }
      .weight {
        grid-area: weight;
      }
      .base-experience {
        grid-area: base-experience;
      }
      .capture-rate {
        grid-area: capture-rate;
      }
      .types {
        grid-area: types;
      }
      .description {
        grid-area: description;
      }
    }

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }

      .dice{
        position: absolute;
        bottom: 0;
        left: 0;
      }

      span {
        > * {
          background-color: var(--dark-pink) !important;
        }
      }
    }
  }
`;

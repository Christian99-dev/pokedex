import { Pokemon } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../shared/Icon";
import TypeButton from "../../shared/TypeButton";
import Button from "../../shared/Button";
import { BounceLoader } from "react-spinners";
import type { SuccessResponse, ErrorResponse } from "@/pages/api/generate-pokemon-description";

const PokemonDisplay = ({
  pokemon,
  prevButton,
  nextButton,
}: {
  pokemon: Pokemon | null | undefined;
  prevButton: () => void;
  nextButton: () => void;
}) => {
  const [currentDescription, setCurrentDescription] = useState(
    pokemon?.description
  );
  const [showDescriptionSelection, setShowDescriptionSelection] = useState(
    pokemon?.description === null
  );
  const [infoText, setInfoText] = useState("Generate Description");
  const [showLoader, setShowLoader] = useState(false);

  const generateDescription = (ai: boolean) => {
    if(!pokemon) return
    setShowLoader(true);
    setShowDescriptionSelection(false);

    fetch("/api/generate-pokemon-description", {
      method: "POST",
      body : JSON.stringify({
        pokemon: pokemon,
        ai: ai,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Server Error");
      })
      .then((response: SuccessResponse) => {
        setCurrentDescription(response.description);
        setShowLoader(false);
      })
      .catch((error: ErrorResponse) => {
        setInfoText("Try again Later...")
        setShowDescriptionSelection(true);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (!pokemon) return;

    setShowLoader(false);
    setCurrentDescription(pokemon.description);
    setShowDescriptionSelection(pokemon.description === null);
    setInfoText("Generate Description");
  }, [pokemon]);

  return (
    <PokemonDisplayWrapper>
      <div className="img-wrapper">
        <div className="number">{formatNumber(pokemon?.id)}</div>
        <img className="pokemon-img" src={pokemon?.image} alt={pokemon?.name} />
      </div>
      <div className="types">
        {pokemon?.types.map((value: string, index: number) => (
          <TypeButton typeName={value} key={index} />
        ))}
      </div>
      <div className="description">
        {showDescriptionSelection && (
          <div className="selection">
            <div className="info">{infoText}</div>
            <div className="buttons">
              <Button
                text="AI"
                route=""
                size="small"
                onClick={() => generateDescription(true)}
              />
              <Button
                text="Random"
                route=""
                size="small"
                onClick={() => generateDescription(false)}
              />
            </div>
          </div>
        )}
        {!showDescriptionSelection && currentDescription}
        {showLoader && (
          <div className="loader-wrapper">
            <BounceLoader />
          </div>
        )}
      </div>
      <div className="bottom">
        <Icon iconname="arrow_left.svg" onClick={prevButton} />
        <div className="name">{pokemon?.name}</div>
        <Icon iconname="arrow_right.svg" onClick={nextButton} />
      </div>
    </PokemonDisplayWrapper>
  );
};

export default PokemonDisplay;

const PokemonDisplayWrapper = styled.div`
  position: relative;
  height: 100%;
  width: min-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-md);

  .description {
    color: white;
    font-size: var(--fs-5);
    font-weight: 300;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .selection {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-xxs);
      .buttons {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
      }

      .info {
        text-align: center;
      }
    }

    .loader-wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 40px !important;
        height: 40px !important;

        > * {
          background-color: var(--pink) !important;
        }
      }
    }
  }

  .types {
    display: flex;
    gap: var(--space-sm);
  }

  .img-wrapper {
    position: relative;

    .number {
      z-index: 0;
      position: absolute;
      font-size: 150px;
      color: white;
      color: var(--pink);
      opacity: 0.2;
      left: calc(var(--space-xxxl));
      top: calc(-1 * var(--space-xl));
    }

    .pokemon-img {
      z-index: 1;
      ${responsiveCSS("width", 450, 400, 350, 300, 250, 200)}
      ${responsiveCSS("height", 450, 400, 350, 300, 250, 200)}
      
      margin: 0 auto;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: var(--pink);
      font-weight: 600;
      font-size: var(--fs-1);
    }
  }
`;

function formatNumber(num: number | undefined | null) {
  let numStr = String(num);

  if (numStr.length < 3) {
    while (numStr.length < 3) {
      numStr = "0" + numStr;
    }
  }
  return "#" + numStr;
}

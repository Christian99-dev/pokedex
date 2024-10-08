import Attack from './Attack';
import Button from '../../shared/Button';
import Icon from '../../shared/Icon';
import React, { useEffect, useState } from 'react';
import Stat from './Stat';
import styled from 'styled-components';
import TypeButton from '../../shared/TypeButton';
import { BounceLoader } from 'react-spinners';
import { convertPokemonId } from '@/utils/helper';
import { Pokemon } from '@/context/PokemonContext';
import type {
  SuccessResponse,
  ErrorResponse,
} from "@/pages/api/generate-pokemon-description";
import { device } from '@/theme/breakpoints';

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
    if (!pokemon) return;
    setShowLoader(true);
    setShowDescriptionSelection(false);

    fetch("/api/generate-pokemon-description", {
      method: "POST",
      body: JSON.stringify({
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
        setInfoText("Try again Later...");
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
        <div className="number">{pokemon?.id && convertPokemonId(pokemon.id)}</div>
        <img className="pokemon-img" src={pokemon?.image} alt={pokemon?.name} />
      </div>

      <div className="infos">
        <div className="left">
          <Stat name="Höhe" value={pokemon?.height.toString() || ""} border />
          <Stat
            name="Gewicht"
            value={pokemon?.weight.toString() || ""}
            border
          />
          <Stat
            name="Basiserfahrung"
            value={pokemon?.base_experience.toString() || ""}
            border
          />
          <Stat
            name="Fangrate"
            value={pokemon?.capture_rate.toString() || ""}
            border
          />
        </div>
        <div className="middle">
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
        </div>
        <div className="right">
          {pokemon?.moves?.map((move, key) => (
            <Attack name={move.name} type={move.type} key={key} />
          ))}
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <Icon iconname="arrow_left.svg" onClick={prevButton} />
        </div>
        <div className="middle">
          <div className="name">{pokemon?.name}</div>
        </div>
        <div className="right">
          <Icon iconname="arrow_right.svg" onClick={nextButton} />
        </div>
      </div>
    </PokemonDisplayWrapper>
  );
};

export default PokemonDisplay;

const PokemonDisplayWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-md);

  .infos {
    color: white;
    display: flex;
    justify-content: center;
    gap: var(--space-md);

    .left,
    .right {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: var(--space-md);
    }

    .middle {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      flex: 1;

      .types {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
      }

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
    }
  }

  .img-wrapper {
    position: relative;
    width: min-content;
    margin: 0 auto;

    .number {
      z-index: 0;
      position: absolute;
      font-size: var(--big-number);
      color: white;
      color: var(--pink);
      opacity: 0.2;
      left: calc(var(--space-xxxl));
      top: calc(-1 * var(--space-xl));
    }

    .pokemon-img {
      position: relative;
      z-index: 1;
      height: var(--pokemon-img-l);
      width: var(--pokemon-img-l);
      margin: 0 auto;
    }
  }

  .bottom {
    display: flex;
    .left {
      display: flex;
      justify-content: right;
      align-items: center;
      flex: 1;
    }
    .middle {
      flex: 1;
      .name {
        text-align: center;
        color: var(--pink);
        font-weight: 600;
        font-size: var(--fs-1);
      }
    }
    .right {
      display: flex;
      justify-content: left;
      align-items: center;
      flex: 1;
    }
  }

  @media ${device.tablet_sm} {

    .infos{
      flex-direction: column;
    }
  }
`;


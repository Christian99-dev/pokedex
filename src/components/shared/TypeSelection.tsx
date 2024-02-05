import { usePokemonContext } from "@/context/PokemonContext";
import React, { useState } from "react";
import Icon from "./Icon";
import TypeButton from "./TypeButton";
import styled from "styled-components";

const TypeSelection = ({
  state,
  setState,
  active = true,
  className,
}: {
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  active?: boolean;
  className?: string;
}) => {
  const { allTypes } = usePokemonContext();
  const [open, setOpen] = useState<Boolean>(false);

  const addType = (type: string) => {
    setState((oldVal: string[]) => {
      const newVal: string[] = [...oldVal, type];
      return newVal;
    });
  };

  const delType = (type: string) => {
    setState((oldVal: string[]) => {
      const newVal: string[] = oldVal.filter(
        (currentType) => currentType != type
      );
      return newVal;
    });
  };

  const toggleFilter = () => {
    setOpen(!open);
  };

  return (
    <TypeSelectionWrapper className={className}>
      {/* Button */}
      <div className="controls">
        <h2>Typen</h2>

        {/* Alle ausgewählten */}
        {state.length > 0 && (
          <div className="types-selected">
            {state.map((type: string, index: number) => {
              return (
                <TypeButton
                  typeName={type}
                  key={index}
                  onClick={() => delType(type)}
                />
              );
            })}
          </div>
        )}
        {active ? (
          <Icon
            iconname="add-circle.svg"
            className="add-icon"
            onClick={() => toggleFilter()}
          />
        ) : (
          <Icon iconname="add-circle.svg" className="add-icon closed" />
        )}
      </div>

      <div className="types-container">
        {/* Auswahl */}
        <div className={"types-selection " + (open ? "open" : "")}>
          {allTypes
            .filter((type: string) => {
              return state.indexOf(type) === -1;
            })
            .map((type: string, index: number) => {
              return (
                <TypeButton
                  typeName={type}
                  key={index}
                  onClick={() => {
                    toggleFilter();
                    addType(type);
                  }}
                />
              );
            })}
        </div>
      </div>
    </TypeSelectionWrapper>
  );
};

export default TypeSelection;

const TypeSelectionWrapper = styled.div`
  .controls {
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    h2 {
      font-weight: 300;
      font-size: var(--fs-3);
      color: var(--pink);
    }

    .add-icon {
      &.closed {
        opacity: 0.5;
      }
    }

    .types-selected {
      display: flex;
      gap: var(--space-xs);
      flex-wrap: wrap;
    }
  }

  .types-container {
    position: relative;

    button {
      cursor: pointer;
    }

    .types-selection {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: var(--dark-pink);
      border: none;
      border-radius: 10px;
      height: 0%;
      overflow: hidden;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);

      &.open {
        border: 2px solid white;
        height: min-content;
      }
    }
  }
`;

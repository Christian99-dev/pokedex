import { usePokemonContext } from "@/context/PokemonContext";
import React, { useState } from "react";
import Icon from "./Icon";
import TypeButton from "./TypeButton";
import styled from "styled-components";

const TypeSelection = ({ onUpdate }: { onUpdate: any }) => {
  const { allTypes } = usePokemonContext();
  const [open, setOpen] = useState<Boolean>(false);
  const [types, setTypes] = useState<string[]>([]);

  const addType = (type: string) => {
    setTypes((oldVal: string[]) => {
      const newVal: string[] = [...oldVal, type];
      onUpdate(newVal);
      return newVal;
    });
  };

  const delType = (type: string) => {
    setTypes((oldVal: string[]) => {
      const newVal: string[] = oldVal.filter(
        (currentType) => currentType != type
      );
      onUpdate(newVal);
      return newVal;
    });
  };

  const toggleFilter = () => {
    setOpen(!open);
  };

  return (
    <TypeSelectionWrapper>
      <div className="controls">
        <h2>Typen</h2>
        <Icon iconname="add-circle.svg" onClick={() => toggleFilter()} />
      </div>

      <div className="types-container">
        <div className="types-selected">
          {types.map((type: string, index: number) => {
            return (
              <TypeButton
                typeName={type}
                key={index}
                onClick={() => delType(type)}
              />
            );
          })}
        </div>

        <div className={"types-selection " + (open ? "open" : "")}>
          {allTypes
            .filter((type: string) => {
              return types.indexOf(type) === -1;
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
  }

  .types-container {
    position: relative;
    button {
      cursor: pointer;
    }
    .types-selected {
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
      &.open {
        border: 2px solid white;
        height: min-content;
      }
    }
  }
`;

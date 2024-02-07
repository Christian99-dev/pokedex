import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import { Pokemon } from "@/context/PokemonContext";
import Icon from "@/components/shared/Icon";
import { device } from "@/theme/breakpoints";

const BattleResultModal = ({
  isOpen,
  onClose,
  winner,
  selectedPokemon1,
  selectedPokemon2,
}: {
  isOpen: boolean;
  onClose: () => void;
  winner?: Pokemon | null;
  selectedPokemon1?: Pokemon | null;
  selectedPokemon2?: Pokemon | null;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    setModalIsOpen(false);
    onClose();
  };

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  return (
    <ModalWrapper
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      contentLabel="Battle Result Modal"
      style={{
        overlay: {
          backgroundColor: "var(--dark-transparent)",
          padding: "var(--modal-space)",
        },
        content: {
          height: "100%",
          backgroundColor: "var(--pink)",
          borderRadius: "10px",
        },
      }}
    >
      <Icon iconname="close.svg" className="close-icon" onClick={handleClose} />

      {winner && (
        <div className="winner">
          <h1> THE WINNER </h1>
          <img src={winner.image} alt={winner.name} className="pokemon-img" />
          <h1>{winner.name}</h1>
        </div>
      )}

      {!winner && selectedPokemon1 && selectedPokemon2 && (
        <div className="draw">
          <div className="images">
            <img
              src={selectedPokemon1.image}
              alt={selectedPokemon1.name}
              className="pokemon-img"
            />
            <img
              src={selectedPokemon2.image}
              alt={selectedPokemon2.name}
              className="pokemon-img"
            />
          </div>
          <h1>DRAW!</h1>
        </div>
      )}
    </ModalWrapper>
  );
};

const rotateAndScaleAnimation = keyframes`
  0% {
    transform: scale(0.2) rotate(0deg);
  }
  25%{
    transform: scale (0.4) rotate (90deg);
  }

  50% {
    transform: scale (0.6) rotate(180deg);
  }
  75%{
    transform: scale (0.8) rotate (270deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
`;

const ModalWrapper = styled(Modal)`
  position: relative;
  .close-icon {
    position: absolute;
    top: var(--space-sm);
    left: var(--space-sm);
  }

  .pokemon-img {
    animation: ${rotateAndScaleAnimation} 3s linear 1;
    width: var(--pokemon-img-l);
    height: var(--pokemon-img-l);
  }

  .draw {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .images {
      display: flex;
      gap: var(--space-sm);
      justify-content: center;
    }
  }

  .winner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  @media ${device.tablet_sm} {
    .draw {
      .images {
        flex-direction: column;
      }
    }
  }
`;

export default BattleResultModal;

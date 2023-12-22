import React from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import { Pokemon } from "@/context/PokemonContext";
import TypeButton from "@/components/TypeButton";
import Icon from "@/components/Icon";

interface BattleResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner?: Pokemon | null;
  selectedPokemon1?: Pokemon |null; 
  selectedPokemon2?: Pokemon|null; 
}

const BattleResultModal: React.FC<BattleResultModalProps> = ({
  isOpen,
  onClose,
  winner,
  selectedPokemon1,
  selectedPokemon2,
}) => {
  return (
    <Modal
      isOpen={isOpen}onRequestClose={onClose}contentLabel="Battle Result Modal"
      style = {{
        content: {
            width: "50%", 
            height: "50%", 
            margin: "auto", 
            backgroundColor: "var(--pink)",
            borderRadius: "20px",
          },
      }}
      >
        <Icon iconname="close.svg" className="close-icon" onClick={onClose}/>
        {winner && (
        <ModalContent>
            <h1> THE WINNER </h1>
            <StyledWinnerImage src={winner.image} alt={winner.name} />
            <WinnerInfo>
                <h1>{winner.name}</h1>
            </WinnerInfo>
        </ModalContent>
      )}
 
        {(!winner && selectedPokemon1 &&selectedPokemon2) && (
        
        <DrawInfo>

            <div className="pok">
                <PokImage src ={selectedPokemon1.image} alt = {selectedPokemon1.name} />
                <PokInfo> 
                    <h2> {selectedPokemon1?.name} </h2>
                    <div className="types-container">
                        {selectedPokemon1?.types.map((type) => (
                            <TypeButton key={type.type.name} typeName={type.type.name} />
                        ))}
                    </div>
                </PokInfo>
            </div> 
            <div className="draw-message"> <h2>1:1</h2> </div>
            <div className="pok" >
                <PokImage src ={selectedPokemon2.image} alt = {selectedPokemon2.name} />
                <PokInfo> 
                    <h2>{selectedPokemon2?.name} </h2>
                    <div className="types-container">
                        {selectedPokemon2?.types.map((type) => (
                            <TypeButton key={type.type.name} typeName={type.type.name} />
                        ))}
                    </div> 
                </PokInfo>       
            </div> 
        </DrawInfo>
            )}
    </Modal>
  );
};
const DrawInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 300px;
  .draw-message {
       h2 {
        color: var(--dark-pink);
        font-size: var(--fs-2);
        margin: 0;
       }
    }
`;
const PokImage = styled.img `
    width: 200px; 
    height: 200px;   
`; 
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
`;
const WinnerInfo = styled.div`
  text-align: center;
  h1 {
    font-size: 50px;
    color: var(--dark-pink);
    letter-spacing: 2px;
    margin-bottom: var(--space-xxl);
  }

  p {
    margin: 0;
    color: #431616;
  }
  
`;

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

const StyledWinnerImage = styled.img`
  width: 380px;
  height: 380px;
  border-radius: 50%;
  margin-bottom: 10px;
  animation: ${rotateAndScaleAnimation} 3s linear 1;
`;


const PokInfo = styled.div`
  text-align: center;
`;

export default BattleResultModal;
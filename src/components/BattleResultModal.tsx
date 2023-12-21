import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
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
          },
      }}
      >
        <Icon iconname="close.svg" className="vs-icon" onClick={onClose}/>
        {winner && (
        <ModalContent>
            <WinnerImage src={winner.image} alt={winner.name} />
            <WinnerInfo>
                <p>{`0${winner.id}`}</p>
                <p>{winner.name}</p>
                <p>
                    {winner.types.map((type) => (
                    <span key={type.type.name}>{`${type.type.name} `}</span>
                    ))}
                </p>
            </WinnerInfo>
        </ModalContent>
      )}
 
        {(!winner && selectedPokemon1 &&selectedPokemon2) && (
        <DrawInfo>
            <h2> {selectedPokemon1?.name} </h2>
            

            <div className="pok">
                <PokImage src ={selectedPokemon1.image} alt = {selectedPokemon1.name} />
                <div className="types-container">
                    {selectedPokemon1?.types.map((type) => (
                        <TypeButton key={type.type.name} typeName={type.type.name} />
                    ))}
                </div>
            </div> 
            <div className="pok" >
                <h2> = {selectedPokemon2?.name} </h2>
                <PokImage src ={selectedPokemon2.image} alt = {selectedPokemon2.name} />
                <div className="types-container">
                    {selectedPokemon2?.types.map((type) => (
                        <TypeButton key={type.type.name} typeName={type.type.name} />
                    ))}
                </div>        
            </div> 
        </DrawInfo>
            )}
    </Modal>
  );
};
const DrawInfo = styled.div `
    width: 100px; 
    height: 300px; 
`; 
const PokImage = styled.img `
    width: 400px; 
    height: 400px;   
`; 
const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WinnerImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  margin-right: 20px;
`;

const WinnerInfo = styled.div`
  text-align: left;

  p {
    margin: 0;
    color: #431616;
  }
`;

export default BattleResultModal;
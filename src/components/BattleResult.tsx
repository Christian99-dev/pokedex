import React , {useState} from "react";
import styled from "styled-components";
import { Pokemon } from "@/context/PokemonContext";
import typeEffectiveness from "./TypeEffectiveness";
import BattleResultModal from "./BattleResultModal"; 
import Icon from "@/components/Icon";


interface BattleResultProps {
    selectedPokemon1: Pokemon |null; 
    selectedPokemon2: Pokemon|null; 
    modalIsOpen: boolean;
    onOpenModal: () => void;
    onCloseModal: () => void;
}

const BattleResult: React.FC<BattleResultProps> = ({selectedPokemon1,selectedPokemon2, 
    modalIsOpen, onOpenModal, onCloseModal }) => {
    


    const calculateEffectiveness = (type1: string, type2: string): number => {
    if (!(type1 in typeEffectiveness) || (type2 && !(type2 in typeEffectiveness))) {
        console.log(type1)
        console.log(type2)
        console.error("Invalid Pokémon types");
        return 1; 
    }
    type2 = type2 || type1;
    const effectiveness = typeEffectiveness[type1][type2];
    console.log("ich bin hier" + effectiveness)
    return effectiveness; 
    }; 

    const determineWinner = (): Pokemon |null => {
        if(!selectedPokemon1 ||!selectedPokemon2) {
            console.error("Pokemon not found"); 
            return null; 
        }
        const effectiveness1 = calculateEffectiveness(
            selectedPokemon1.types[0].type.name,
            selectedPokemon2.types[0].type.name
        ) + calculateEffectiveness(selectedPokemon1.types[1]?.type.name, selectedPokemon2.types[1]?.type.name);  
        
        console.log("hallo" + effectiveness1)
        const effectiveness2 = calculateEffectiveness(
            selectedPokemon2.types[0].type.name,
            selectedPokemon1.types[0].type.name
        ) + calculateEffectiveness(selectedPokemon2.types[1]?.type?.name, selectedPokemon1.types[1]?.type?.name); 
        
        if(effectiveness1 > effectiveness2) {
            return selectedPokemon1; 

        }
        else if(effectiveness2> effectiveness1) {
            return selectedPokemon2; 
        }
        else{
            return null; 
        }
        
    }

    return (
        <>
        {modalIsOpen && (
          <BattleResultModal
            isOpen={modalIsOpen}
            onClose={onCloseModal}
            winner={determineWinner()}
            selectedPokemon1={selectedPokemon1}
            selectedPokemon2={selectedPokemon2}
          />
        )}
      </>
    );
  };

export default BattleResult;
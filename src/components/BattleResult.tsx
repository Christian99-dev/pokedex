import React from "react";
import { Pokemon } from "@/context/PokemonContext";
import typeEffectiveness from "../types/TypeEffectiveness";
import BattleResultModal from "./BattleResultModal"; 


interface BattleResultProps {
    selectedPokemon1: Pokemon |null; 
    selectedPokemon2: Pokemon|null; 
    modalIsOpen: boolean;
    onCloseModal: () => void;
}

const BattleResult: React.FC<BattleResultProps> = ({selectedPokemon1,selectedPokemon2, 
    modalIsOpen, onCloseModal }) => {
        const calculateEffectiveness = (type1: string, type2: string): number => {
            const effectiveness = typeEffectiveness[type1]?.[type2] || 0;
            if (!effectiveness) {
                console.error("Invalid Pokémon type");
            }
            return effectiveness;
        };
        const calculateTotalEffectiveness = (pokemon1: Pokemon, pokemon2: Pokemon): number => {
            const totalEffectiveness = (type1: string, type2: string | undefined): number => {
                return type2 ? calculateEffectiveness(type1, type2) : 0;
            };
        
            return (
                totalEffectiveness(pokemon1.types[0].type.name, pokemon2.types[0].type.name) +
                (pokemon1.types.length === 2 ? totalEffectiveness(pokemon1.types[1].type.name, pokemon2.types[0].type.name) : 0) +
                (pokemon2.types.length === 2 ? totalEffectiveness(pokemon1.types[0].type.name, pokemon2.types[1].type.name) : 0) +
                (pokemon1.types.length === 2 && pokemon2.types.length === 2
                    ? totalEffectiveness(pokemon1.types[1].type.name, pokemon2.types[1].type.name)
                    : 0)
            );
        };
        const determineWinner = (): Pokemon | null => {
            if (!selectedPokemon1 || !selectedPokemon2) {
                console.error("Pokemon not found");
                return null;
            }
        
            const effectiveness1 = calculateTotalEffectiveness(selectedPokemon1, selectedPokemon2);
            const effectiveness2 = calculateTotalEffectiveness(selectedPokemon2, selectedPokemon1);
        
            if (effectiveness1 > effectiveness2) {
                return selectedPokemon1;
            } else if (effectiveness2 > effectiveness1) {
                return selectedPokemon2;
            } else {
                return null;
            }
        };

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
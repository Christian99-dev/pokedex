import { Pokemon } from "@/context/PokemonContext";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ai, pokemon }: DescriptionRequestBody = JSON.parse(req.body);

  if (ai) {
    const prompt = `Generiere eine kurze, klare Beschreibung für das Pokémon mit dem Namen ${pokemon.name}. Die Beschreibung sollte maximal 12 Wörter beinhalten. Sie darf maximal 1 - 2 Sätze lang sein. Die Länge der beschreibung darf unter keinen umständen 12 Wörter überschreiten. Deine Antwort sollte sich wie ein Pokedex-Eintrag lesen, ohne Attacken oder Statistiken zu enthalten. Antworte auf Deutsch und liefere ausschließlich die Beschreibung ohne zusätzliche Anmerkungen.`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "pai-001-light",
        prompt: `Human: ${prompt}\\nAI:`,
        temperature: 0.7,
        max_tokens: 256,
        stop: ["Human:", "AI:", "\n", " \ ", "\nHuman", "\nHuman "],
      }),
    };

    fetch("https://api.pawan.krd/v1/completions", requestOptions)
      .then((res) => res.json())
      .then((ai) => {
        res.status(200).json(ai.choices[0].text);
      })
      .catch((error) => {
        console.error("Error with pawanAI:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else {
    fetch("http://localhost:3000/data/pokemonDescriptions.json")
      .then((res) => res.json())
      .then((all: string[]) => {
        res.status(200).json(all[Math.floor(Math.random() * all.length)]);
      })
      .catch((error) => {
        console.error("Error fetching or parsing JSON:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}

export type DescriptionRequestBody = {
  pokemon: Pokemon;
  ai: boolean;
};

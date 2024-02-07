export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const convertPokemonId = (id: number) => {
  let numStr = String(id);

  if (numStr.length < 3) {
    while (numStr.length < 3) {
      numStr = "0" + numStr;
    }
  }
  return "#" + numStr;
};

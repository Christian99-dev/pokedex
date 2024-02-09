import { getRandomInt, convertPokemonId } from "@/utils/helper";

describe("Utils", () => {
  describe("getRandomInt", () => {
    it("generates a random number within the specified range", () => {
      const min = 5;
      const max = 10;
      const randomInt = getRandomInt(min, max);

      expect(randomInt).toBeGreaterThanOrEqual(min);
      expect(randomInt).toBeLessThanOrEqual(max);
    });
  });

  describe("convertPokemonId", () => {
    it("converts Pokemon ID to the correct format", () => {
      const id1 = 1;
      const id42 = 42;
      const id123 = 123;

      expect(convertPokemonId(id1)).toBe("#001");
      expect(convertPokemonId(id42)).toBe("#042");
      expect(convertPokemonId(id123)).toBe("#123");
    });
  });
});

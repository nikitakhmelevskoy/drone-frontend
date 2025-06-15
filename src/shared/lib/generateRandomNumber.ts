export const generateRandomNumber = (min = 0, max = 1_000) =>
  ~~(Math.random() * (max - min + 1)) + min;

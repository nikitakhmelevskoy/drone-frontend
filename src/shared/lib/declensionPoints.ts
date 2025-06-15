export const declensionPoints = (num: number) => {
  const lastTwo = num % 100;
  if (lastTwo >= 11 && lastTwo <= 19) {
    return `${num} точек`;
  }

  const lastOne = num % 10;
  if (lastOne === 1) {
    return `${num} точка`;
  }
  if (lastOne >= 2 && lastOne <= 4) {
    return `${num} точки`;
  }
  return `${num} точек`;
};

export const sumPrice = (items, addiitionalCost) => {
  let total = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  return Number(total) + Number(addiitionalCost);
};

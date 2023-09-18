export const formatPrice = (num) => {
  return (
    "Rp. " +
    Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  );
};

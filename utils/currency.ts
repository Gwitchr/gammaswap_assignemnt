export const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  //roundingIncrement: 5,
});

export const numberFormat = new Intl.NumberFormat();

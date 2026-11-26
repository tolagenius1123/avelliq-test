const currencyFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
const compactCurrencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
})

export const formatCurrency = (amount: number) => currencyFormat.format(amount)
export const formatCompactCurrency = (amount: number) => compactCurrencyFormat.format(amount)

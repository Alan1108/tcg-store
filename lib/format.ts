export const formatPrice = (amount: number, currencyCode: string = "USD") =>
  new Intl.NumberFormat("es-EC", { style: "currency", currency: currencyCode }).format(amount)

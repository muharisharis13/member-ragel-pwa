export const inputCurrency = (number) => {
  return new Intl.NumberFormat().format(number)
}

export const currency = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}
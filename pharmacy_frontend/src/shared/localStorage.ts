import { OrderMedicine, Medicine } from './types'

export const addCartLocal = (data: OrderMedicine) => {
  const cart = JSON.parse(localStorage.getItem('pharmacy-cart')) || []

  const checkMedicine = cart.some(
    (p: OrderMedicine) => p.medicine.id === data.medicine.id
  )

  if (checkMedicine) {
    const newCart = cart.filter(
      (p: OrderMedicine) => p.medicine.id !== data.medicine.id
    )

    const p = cart.filter(
      (p: OrderMedicine) => p.medicine.id === data.medicine.id
    )[0]
    const quantity = p.quantity + data.quantity
    newCart.push({
      ...p,
      quantity: quantity
    })

    localStorage.setItem('pharmacy-cart', JSON.stringify(newCart))
  } else {
    cart.push(data)
    localStorage.setItem('pharmacy-cart', JSON.stringify(cart))
  }
}

export const getMedicineByIdLocal = (data: Medicine) => {
  const cart = JSON.parse(localStorage.getItem('pharmacy-cart')) || []

  const medicine = cart.filter((p: OrderMedicine) => p.medicine.id === data.id)

  return medicine[0]
}

export const getCartLocal = () => {
  const cart = JSON.parse(localStorage.getItem('pharmacy-cart')) || []
  return cart
}

export const deleteMedicineLocal = (data: Medicine) => {
  const cart = JSON.parse(localStorage.getItem('pharmacy-cart')) || []

  const newCart = cart.filter((p: OrderMedicine) => p.medicine.id !== data.id)

  localStorage.setItem('pharmacy-cart', JSON.stringify(newCart))
}

export const removeCartStorage = () => {
  localStorage.removeItem('pharmacy-cart')
}

import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  deleteMedicineLocal,
  getCartLocal,
  removeCartStorage
} from '../../shared/localStorage'
import { Medicine, OrderMedicine } from '../../shared/types'
import { useStore } from '../../store'
import { createOrderApi } from '../../api/orderApi'
import CartItem from '../../components/CartOrder/CartItem'
import cartEmpty from '../../assets/images/img_cart_empty.png'
import { Button } from 'primereact/button'

const OrderCart: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const [cart, setCart] = useState<OrderMedicine[]>([])

  useEffect(() => {
    setCart(getCartLocal())
  }, [])

  const handleDeleteAll = () => {
    removeCartStorage()
    setCart(getCartLocal())
  }

  const handleDeleteItem = (data: Medicine) => {
    deleteMedicineLocal(data)
    setCart(getCartLocal())
  }

  const handleCreateOrder = async () => {
    try {
      const res = await createOrderApi({
        order_details: { ...cart },
        user_id: currentUser?.id
      })
      if (res.status === 200) {
        setCart([])
        toast.success(res.data.message, { theme: 'colored' })
      }
    } catch (error) {
      toast.error(error.message, { theme: 'colored' })
    }
  }

  return (
    <div className="card w-[1200px] max-w-px-4 mx-auto">
      <div className="border-b pb-6">
        <h1 className="font-medium text-xl">Current Order detail</h1>
      </div>

      {cart.length > 0 ? (
        cart.map((product: OrderMedicine) => (
          <CartItem
            key={product.medicine.id}
            data={product}
            setCardPopupOpened={() => false}
            onDelete={handleDeleteItem}
          />
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center my-10">
          <img src={cartEmpty} alt="Empty" className="w-[50%]" />
          <h1 className="mt-10 font-medium">No products order!!!</h1>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-5">
          <div className="text-md text-primary-100 font-semibold px-2 pt-2 flex justify-end">
            <Button
              disabled={cart.length <= 0}
              label="Delete all"
              className="p-button-danger p-button-text"
              onClick={handleDeleteAll}
            />
            <Button
              disabled={cart.length <= 0}
              label="Sale"
              className="p-button-success ml-1"
              onClick={handleCreateOrder}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCart

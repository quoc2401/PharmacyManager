import { FC, useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import cartEmpty from '../../assets/images/img_cart_empty.png'
import ClickAwayListener from '../ClickAwayListener'
import { getCartLocal } from '../../shared/localStorage'
import CartItem from './CartItem'
import { Medicine, OrderMedicine } from '../../shared/types'
import { Button } from 'primereact/button'
import { createOrderApi } from '../../api/orderApi'
import { toast } from 'react-toastify'
import {
  removeCartStorage,
  deleteMedicineLocal
} from '../../shared/localStorage'
import { useStore } from '../../store'
import { Link } from 'react-router-dom'

interface CartProps {
  isOpened: boolean
  setIsOpened: (e: boolean) => void
}

const Cart: FC<CartProps> = ({ isOpened, setIsOpened }) => {
  const currentUser = useStore(state => state.currentUser)
  const [cart, setCart] = useState<OrderMedicine[]>([])

  useEffect(() => {
    setCart(getCartLocal())
  }, [isOpened])

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
        removeCartStorage()
        toast.success(res.data.message, { theme: 'colored' })
      }
    } catch (error) {
      toast.error(error.message, { theme: 'colored' })
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      {ref => (
        <div
          ref={ref}
          className="relative hidden md:flex flex-shrink-0 items-center"
        >
          <Tippy content="Order Cart" arrow={false}>
            <button
              className="p-link header-button"
              onClick={() => setIsOpened(!isOpened)}
            >
              <i className="pi pi-shopping-cart text-xl"></i>
            </button>
          </Tippy>
          <div
            className={`absolute z-[11] right-0 w-full top-full flex w-[400px] flex-col items-stretch rounded-md origin-top-right border bg-white shadow-lg transition-all duration-200 ${
              isOpened
                ? 'visible scale-100 opacity-100'
                : 'invisible scale-0 opacity-0'
            }`}
          >
            <h3 className="text-md text-primary-100 font-semibold px-4 py-3">
              Current order
            </h3>

            <div className="w-100 border-b"></div>

            <div className="w-full h-80 flex flex-col overflow-y-auto">
              {cart.length > 0 ? (
                cart.map((product: OrderMedicine) => (
                  <CartItem
                    key={product.medicine.id}
                    data={product}
                    setCardPopupOpened={setIsOpened}
                    onDelete={handleDeleteItem}
                  />
                ))
              ) : (
                <div className="w-full h-80 flex items-center justify-center">
                  <img src={cartEmpty} alt="Empty" className="w-[70%]" />
                </div>
              )}
            </div>

            <div className="text-md text-primary-100 font-semibold p-2 border-t flex justify-between">
              <Button
                disabled={cart.length <= 0}
                label="Delete all"
                className="p-button-danger p-button-text"
                onClick={handleDeleteAll}
              />
              <div>
                <Link to={'/order-cart'}>
                  <Button
                    disabled={cart.length <= 0}
                    label="See details"
                    className="p-button-success p-button-text ml-1"
                  />
                </Link>
                <Button
                  disabled={cart.length <= 0}
                  label="Sale"
                  className="p-button-success p-button-outlined ml-1"
                  onClick={handleCreateOrder}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ClickAwayListener>
  )
}

export default Cart

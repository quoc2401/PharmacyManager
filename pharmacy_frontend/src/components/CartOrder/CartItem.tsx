import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Medicine, OrderMedicine } from '../../shared/types'
import { formatCurrency } from '../../shared/utils'
import { convertParam } from '../../shared/constant'

interface CartItemProps {
  data: OrderMedicine
  setCardPopupOpened: (e: boolean) => void
  onDelete: (data: Medicine) => void
}

const CartItem: FC<CartItemProps> = ({
  data,
  setCardPopupOpened,
  onDelete
}) => {
  return (
    <div className="flex flex-row items-start gap-2 px-2 py-1 hover:bg-slate-100 border-b">
      <Link
        to={`/medicine-details/${convertParam(data.medicine.name)}/${
          data.medicine.id
        }`}
        onClick={() => setCardPopupOpened(false)}
      >
        <div className="border-2">
          <img
            src={data.medicine.image}
            alt=""
            className="object-contain w-20 h-[60px]"
          />
        </div>
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start gap-2 w-full">
          <Link
            to={`/medicine-details/${convertParam(data.medicine.name)}/${
              data.medicine.id
            }`}
            onClick={() => setCardPopupOpened(false)}
          >
            <h3 className="font-medium text-slate-500 line-clamp-1">
              {data.medicine.name}
            </h3>
          </Link>
          <span className="text-red-500">
            {formatCurrency(data.medicine.unit_price)}
          </span>
        </div>
        <div className="mt-2 text-sm flex justify-between items-center">
          <p className="text-slate-500">Quantity: {data.quantity}</p>
          <p
            className="mt-2 text-xs font-medium text-red-500 hover:underline cursor-pointer"
            onClick={() => onDelete(data.medicine)}
          >
            Delete
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem

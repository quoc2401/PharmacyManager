import React, { FC, useState } from 'react'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import Tippy from '@tippyjs/react'
import { Medicine } from '../shared/types'
import { Link } from 'react-router-dom'
import { convertParam } from '../shared/constant'
import ImgFade from './ImgFade'
import { formatCurrency } from '../shared/utils'

interface MedicineItemProps {
  item: Medicine
}

const MedicineItem: FC<MedicineItemProps> = ({ item }) => {
  const [number, setNumber] = useState<number | null>(0)

  const totalPrice = () => {
    return Math.abs(
      item.unit_price - item.unit_price * (item.discontinued / 100)
    ).toFixed(2)
  }

  return (
    <div className="flex flex-col bg-slate-100 rounded-md overflow-hidden border overflow-hidden shadow-md">
      <div className="hover:brightness-90 transition-all transition-duration-200 relative">
        {item.discontinued > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 rounded py-1 px-2 text-white text-sm">
            -{Number(item.discontinued)}%
          </div>
        )}
        <Link to={`/medicine-details/${convertParam(item.name)}/${item.id}`}>
          <ImgFade className="w-full" lazy_src={item.image} />
        </Link>
      </div>
      <div className="px-3 pt-2 pb-3">
        <div className="flex items-center h-[48px]">
          <Link to={`/medicine-details/${convertParam(item.name)}/${item.id}`}>
            <h3 className="font-medium line-clamp-2">{item.name}</h3>
          </Link>
          {item.unit_in_stock > 0 ? (
            <span className="ml-2 text-xs px-[6px] py-[2px] font-semibold rounded-md tracking-wide bg-[#c8e6c9] text-[#256029]">
              INSTOCK
            </span>
          ) : (
            <span className="ml-2 text-xs px-[6px] py-[2px] font-semibold rounded-md tracking-wide bg-[#ffcdd2] text-[#c63737]">
              OUTOFSTOCK
            </span>
          )}
        </div>
        <div className="text-red-500 mt-2 font-medium text-lg">
          {formatCurrency(
            item.discontinued > 0 ? totalPrice() : item.unit_price
          )}
        </div>
        <div className="text-slate-500 mt-2 text-sm">
          Số lượng: {item.unit_in_stock}
        </div>
        <div className="flex items-end justify-between">
          <InputNumber
            min={item.unit_in_stock > 0 ? 1 : 0}
            max={item.unit_in_stock}
            step={1}
            inputId="horizontal"
            value={number}
            onValueChange={e => setNumber(e.target.value)}
            showButtons
            mode="decimal"
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            style={{ height: '32px' }}
            inputStyle={{
              width: '42px',
              fontSize: '14px',
              paddingLeft: '8px',
              paddingRight: '8px'
            }}
          />
          <Tippy content="Add to order" arrow={false}>
            <div>
              <Button
                disabled={!item.unit_in_stock}
                icon="pi pi-cart-plus"
                className="p-button-rounded p-button-success"
              />
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  )
}

export default MedicineItem

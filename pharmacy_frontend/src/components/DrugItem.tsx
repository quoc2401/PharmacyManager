import React, { FC, useState } from 'react'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import Tippy from '@tippyjs/react'

const DrugItem: FC = () => {
  const [number, setNumber] = useState<number | null>(0)

  return (
    <div className="flex flex-col bg-white w-[250px] rounded-md m-4 overflow-hidden p-1">
      <div className="hover:brightness-75">
        <img src="https://salt.tikicdn.com/cache/280x280/ts/product/bb/ea/36/a3ac3f3344e0a3e7f8e99cad7a5514e3.png" />
      </div>
      <div className="p-2">
        <div className="flex items-center h-[48px]">
          <h3 className="font-medium line-clamp-2">
            Ten thuoc Ten thuoc Ten thuoc Ten thuoc Ten thuoc Ten thuoc Ten
            thuoc Ten thuoc
          </h3>
          <span className="ml-2 text-xs px-[7px] py-[3px] font-semibold rounded-md tracking-wide bg-[#c8e6c9] text-[#256029]">
            INSTOCK
          </span>
        </div>
        <div className="text-slate-500 mt-2 text-sm">Số lượng: 2</div>
        <div className="flex items-end justify-between">
          <InputNumber
            min={0}
            max={50}
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

export default DrugItem

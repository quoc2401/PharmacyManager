import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Medicine } from '../../shared/types'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { getMedicineByIdApi } from '../../api/medicineApi'
import { formatCurrency } from '../../shared/utils'
import { toast } from 'react-toastify'
import { getMedicineByIdLocal, addCartLocal } from '../../shared/localStorage'
import { Skeleton } from 'primereact/skeleton'

const MedicineDetail: FC = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState<number | null>(0)
  const [medicine, setMedicine] = useState<Medicine>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const res = await getMedicineByIdApi(id)
        setMedicine(res.data.medicine)
        setLoading(false)
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
    getData()
  }, [])

  const handleAddCart = () => {
    const medicineLocal = getMedicineByIdLocal(medicine)
    console.log(medicineLocal)
    if (medicineLocal && medicineLocal.quantity >= medicine.unit_in_stock) {
      toast.error('Đã đạt số lượng tối đa. Không còn hàng')
    } else {
      addCartLocal({
        medicine: { ...medicine },
        quantity: quantity
      })
      setQuantity(1)
      toast.success('Đã thêm vào giỏ hàng')
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[1200px] max-w-px-4 mx-auto flex flex-col md:flex-row bg-white shadow-md rounded">
        <div className="w-full md:w-[50%] p-4">
          {loading ? (
            <Skeleton height="550px" />
          ) : (
            <img src={medicine?.image} alt="" className="object-cover w-full" />
          )}
        </div>
        <div className="w-full md:w-[50%] flex flex-col pt-4 px-4 md:px-3 pb-10 space-y-6">
          <div className="w-full flex justify-between items-center">
            {loading ? (
              <Skeleton height="32px" width="40%" />
            ) : (
              <h1 className="text-2xl text-primary-300 font-bold">
                {medicine?.name}
              </h1>
            )}
          </div>

          {loading ? (
            <Skeleton height="62px" />
          ) : (
            <div className="flex items-center space-x-2 py-4 px-3 bg-secondary-100">
              <span className="text-red-600 font-semibold text-2xl">
                {formatCurrency(medicine?.unit_price)}
              </span>
            </div>
          )}

          {loading ? (
            <Skeleton height="32px" width="50%" />
          ) : (
            <div className="flex items-center space-x-4">
              <div className="font-medium">Quantity:</div>

              <div className="flex items-center space-x-3 text-slate-500">
                <InputNumber
                  min={medicine && medicine.unit_in_stock > 0 ? 1 : 0}
                  max={medicine ? medicine.unit_in_stock : undefined}
                  step={1}
                  inputId="horizontal"
                  value={quantity}
                  onValueChange={(e: any) => setQuantity(e.target.value)}
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
                <div>{medicine?.unit_in_stock} unit in stock</div>
              </div>
            </div>
          )}

          {loading ? (
            <Skeleton height="42px" width="40%" />
          ) : (
            <div className="w-[40%]">
              <Button
                label="Add to order"
                className="w-full font-medium p-button-success p-button-raised"
                onClick={handleAddCart}
              />
            </div>
          )}

          {loading ? (
            <>
              <Skeleton width="60%" />
              <Skeleton width="100%" />
              <Skeleton width="40%" />
              <Skeleton width="40%" />
            </>
          ) : (
            <>
              <div>
                <span className="font-medium">Describe: </span>
                <span className="text-slate-500">{medicine?.describe}</span>
              </div>

              <div>
                <span className="font-medium">Uses: </span>
                <span className="text-slate-500">{medicine?.uses}</span>
              </div>

              <div>
                <span className="font-medium">Trademark: </span>
                <span className="text-slate-500">{medicine?.trademark}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicineDetail

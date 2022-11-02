import React, { FC, useEffect, useState } from 'react'
import GridItem from '../../components/GridItem'
import { useTitle } from '../../hooks/useTitle'
import { InputText } from 'primereact/inputtext'
import { Paginator } from 'primereact/paginator'
import { getMedicinesApi } from '../../api/medicineApi'
import CategoryDropdown from '../../components/CategoryDropdown'

const Home: FC = () => {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 1,
    category: null
  })
  const [totalRecords, setTotalRecords] = useState(1)
  useTitle('Pharmacy - Home')

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await getMedicinesApi({
          page: lazyParams.page,
          category: lazyParams.category
        })
        setTotalRecords(res.data.meta.total)
        setMedicines(res.data.data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    getData()
  }, [lazyParams])

  const onCustomPageChange = (event: any) => {
    setLazyParams(event)
  }

  if (error) return <div className="text-red-500">An error occur</div>

  return (
    <div className="card">
      <div className="mb-10 flex justify-between">
        <CategoryDropdown />
        <span className="p-input-icon-right ml-2">
          <i className="pi pi-search" />
          <InputText
            type="text"
            placeholder="Search by medicine name or uses"
            className="w-full"
          />
        </span>
      </div>
      <GridItem data={medicines} loading={loading} />
      <Paginator
        first={lazyParams.first}
        rows={10}
        totalRecords={totalRecords}
        onPageChange={onCustomPageChange}
        className="mt-6"
      />
    </div>
  )
}

export default Home

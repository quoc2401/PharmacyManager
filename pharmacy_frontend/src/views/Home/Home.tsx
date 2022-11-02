import React, { FC, useEffect, useState } from 'react'
import GridItem from '../../components/GridItem'
import { useTitle } from '../../hooks/useTitle'
import { InputText } from 'primereact/inputtext'
import { Paginator } from 'primereact/paginator'
import { getMedicinesApi } from '../../api/medicineApi'
import CategoryDropdown from '../../components/CategoryDropdown'
import { FilterMatchMode } from 'primereact/api'

const Home: FC = () => {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [totalRecords, setTotalRecords] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 0
  })
  const [filters, setFilters] = useState({
    category: { value: '', matchMode: FilterMatchMode.EQUALS },
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    uses: { value: '', matchMode: FilterMatchMode.CONTAINS }
  })
  useTitle('Pharmacy - Home')

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await getMedicinesApi(lazyParams.page + 1, filters)
        setTotalRecords(res.data.meta.total)
        setMedicines(res.data.data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    getData()
  }, [lazyParams, filters])

  const onCustomPageChange = (event: any) => {
    setLazyParams(event)
  }

  if (error) return <div className="text-red-500">An error occur</div>

  return (
    <div className="card">
      <div className="mb-10 flex flex-col sm:flex-row justify-between">
        <CategoryDropdown
          setSelectedItem={setSelectedCategory}
          selectedItem={selectedCategory}
        />
        <span className="p-input-icon-right mt-2 sm:mt-0 min-w-[300px] max-w-full">
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

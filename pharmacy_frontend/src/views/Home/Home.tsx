import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import GridItem from '../../components/GridItem'
import { Category, Medicine } from '../../shared/types'
import { useTitle } from '../../hooks/useTitle'
import { InputText } from 'primereact/inputtext'
import { Paginator } from 'primereact/paginator'
import { getMedicinesApi } from '../../api/medicineApi'
import CategoryDropdown from '../../components/CategoryDropdown'
import { FilterMatchMode } from 'primereact/api'

const Home: FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [totalRecords, setTotalRecords] = useState(1)
  const lazyTimeout = useRef<ReturnType<typeof setTimeout>>()
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: 'Tất cả',
    description: ''
  })
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 0
  })
  const [filters, setFilters] = useState({
    category_id: { value: 1, matchMode: FilterMatchMode.EQUALS },
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    uses: { value: '', matchMode: FilterMatchMode.CONTAINS }
  })
  useTitle('Pharmacy - Home')

  useEffect(() => {
    lazyTimeout.current = setTimeout(() => {
      try {
        getMedicines()
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }, 1000)
    return () => clearTimeout(lazyTimeout.current)
  }, [lazyParams, filters])

  const getMedicines = async () => {
    setLoading(true)
    const res = await getMedicinesApi(lazyParams.page + 1, filters)
    setTotalRecords(res.data.meta.total)
    setMedicines(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    setFilters(prev => {
      const _filters = { ...prev }
      _filters.category_id.value = selectedCategory.id
      _filters.name.value = ''
      _filters.uses.value = ''

      return _filters
    })
    setLazyParams(prev => {
      const _lazyParams = { ...prev }
      _lazyParams.first = 0
      _lazyParams.page = 0

      return _lazyParams
    })

    lazyTimeout.current = setTimeout(async () => {
      try {
        await getMedicines()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(lazyTimeout.current)
  }, [selectedCategory])

  const onCustomPageChange = (event: any) => {
    setLazyParams(event)
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => {
      const _filters = { ...prev }
      _filters.name.value = e.target.value
      _filters.uses.value = e.target.value

      return _filters
    })
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
            value={filters.name.value}
            onChange={e => handleFilter(e)}
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

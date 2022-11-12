import { FC, useState, useEffect, useRef } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { OrderDetailField } from '../../shared/constant'
import { FilterMatchMode } from 'primereact/api'
import { Order } from '../../shared/types'
import { getOrderDetailsApi } from '../../api/orderDetailsApi'

const ManageOrderDetail: FC = () => {
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<Order[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    medicine_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    order_id: { value: '', matchMode: FilterMatchMode.CONTAINS }
  })

  const lazyTimeOut = useRef<ReturnType<typeof setTimeout>>()

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  })

  useEffect(() => {
    lazyTimeOut.current = setTimeout(async () => {
      loadCategories()
    }, 1000)
    return () => clearTimeout(lazyTimeOut.current)
  }, [lazyParams, filters])

  // functions
  const loadCategories = async () => {
    setLoading(true)
    try {
      const res = await getOrderDetailsApi(lazyParams.page + 1, filters)

      setOrderDetails(res.data.data)
      setTotalRecords(res.data.meta.total)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    const _filters = { ...filters }

    filters.medicine_name.value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilter = (field: OrderDetailField, value: string) => {
    const _filters = { ...filters }
    _filters[field].value = value

    const _lazyParams = { ...lazyParams }
    _lazyParams.page = 0
    _lazyParams.first = 0

    setLazyParams(_lazyParams)
    setFilters(_filters)
  }

  const onPage = (event: any) => {
    setLazyParams(event)
  }

  const customFilter = (field: OrderDetailField, placeholder: string) => {
    return (
      <InputText
        value={filters[field].value}
        placeholder={placeholder}
        onChange={e => handleFilter(field, e.target.value)}
        className="rounded-md"
        type={field === OrderDetailField.MEDICINE ? 'text' : 'number'}
      />
    )
  }

  const medicineNameBodyTemplate = (rowData: any) => {
    return rowData.medicine.name
  }

  const clearFilter = (field: OrderDetailField) => {
    setFilters(prev => {
      const _filters = { ...prev }
      _filters[field].value = ''

      return _filters
    })
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Users Manage</h5>
        <div className="flex">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="rounded-md"
              placeholder="Keyword Search"
              onChange={onGlobalFilterChange}
            />
          </span>
        </div>
      </div>
    )
  }

  useTitle(`Pharmacy - Manage User`)
  return (
    <div className="grid-cols-12">
      <div className="card">
        <DataTable
          className=""
          header={renderHeader()}
          value={orderDetails}
          paginator
          rows={10}
          loading={loading}
          responsiveLayout="scroll"
          size="small"
          lazy
          totalRecords={totalRecords}
          onPage={onPage}
          first={lazyParams.first}
          rowHover
          emptyMessage="No orders found!"
          globalFilterFields={['name', 'description']}
          globalFilter={globalFilterValue}
          filterDisplay="row"
          filters={filters}
        >
          <Column field="id" header="Id" className="min-w-[3rem]" />
          <Column
            field="order_id"
            header="Order Id"
            className="min-w-[3rem]"
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              OrderDetailField.ORDER,
              'Search by order id...'
            )}
            onFilterClear={() => clearFilter(OrderDetailField.ORDER)}
          />
          <Column
            field="medicine_id"
            header="Medicine"
            className="min-w-[20rem] whitespace-nowrap"
            body={rowdata => medicineNameBodyTemplate(rowdata)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              OrderDetailField.MEDICINE,
              "Search by medicine's name..."
            )}
            onFilterClear={() => clearFilter(OrderDetailField.MEDICINE)}
          />
          <Column
            field="unit_price"
            header="Unit Price"
            className="min-w-[8rem]"
          />
          <Column field="quantity" header="Quantity" className="min-w-[6rem]" />
          <Column field="discount" header="Discount" className="min-w-[8rem]" />
          <Column
            rowEditor
            className="min-w-[6rem] w-[8%]"
            bodyStyle={{ textAlign: 'center' }}
          />
        </DataTable>
      </div>
    </div>
  )
}

export default ManageOrderDetail

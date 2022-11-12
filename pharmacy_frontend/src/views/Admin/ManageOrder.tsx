import { FC, useState, useEffect, useRef } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { OrderField } from '../../shared/constant'
import { FilterMatchMode } from 'primereact/api'
import { Order } from '../../shared/types'
import { getOrdersApi } from '../../api/orderApi'

const ManageOrder: FC = () => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    employee_name: { value: '', matchMode: FilterMatchMode.CONTAINS }
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
      const res = await getOrdersApi(lazyParams.page + 1, filters)

      setOrders(res.data.data)
      setTotalRecords(res.data.meta.total)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    const _filters = { ...filters }

    filters.employee_name.value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilter = (field: OrderField, value: string) => {
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

  const customFilter = (field: OrderField, placeholder: string) => {
    return (
      <InputText
        value={filters[field].value}
        placeholder={placeholder}
        onChange={e => handleFilter(field, e.target.value)}
        className="rounded-md"
      />
    )
  }

  const userFullnameBodyTemplate = (rowData: any) => {
    return rowData.first_name + ' ' + rowData.last_name
  }

  const clearFilter = (field: OrderField) => {
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
          value={orders}
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
            field="user_id"
            header="Employee"
            className="min-w-[20rem] whitespace-nowrap"
            body={rowdata => userFullnameBodyTemplate(rowdata)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              OrderField.EMPLOYEE,
              "Search by Employee's name..."
            )}
            onFilterClear={() => clearFilter(OrderField.EMPLOYEE)}
          />
          <Column
            field="order_date"
            header="Order Date"
            className="min-w-[14rem]"
            // editor={options => textEditor(options)}
            // filter
            // showFilterMenu={false}
            // filterElement={customFilter(
            //   CategoryField.DESCRIPTION,
            //   'Search by description...'
            // )}
            // onFilterClear={() => clearFilter(OrderField.ORDER_DATE)}
          />
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

export default ManageOrder

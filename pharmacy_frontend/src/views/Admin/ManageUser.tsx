import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { getUsers } from '../../api/userApi'
import { User } from '../../shared/types'
import { textEditor, dateEditor, roleSelector } from '../../components/Editors'
import { birthDateBodyTemplate, formatDate } from '../../shared/constant'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import Tippy from '@tippyjs/react'

const ManageUser: FC = () => {
  const { category } = useParams()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [error, setError] = useState(false)
  const [editingRows, setEditingRows] = useState([])
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null
    // filters: {
    //     'name': { value: '', matchMode: 'contains' },
    //     'country.name': { value: '', matchMode: 'contains' },
    //     'company': { value: '', matchMode: 'contains' },
    //     'representative.name': { value: '', matchMode: 'contains' },
    // }
  })

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'username', header: 'Username' },
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
    { field: 'birth_date', header: 'Birth Date' },
    { field: 'phone', header: 'Phone' },
    { field: 'user_role', header: 'Role' },
    { field: 'created_at', header: 'Created At' },
    { field: 'updated_at', header: 'Updated At' }
  ]

  const callApi = async (page = 1) => {
    setLoading(true)
    try {
      const res = await getUsers(page)
      setUsers(res.data.data.data)
      setTotalRecords(res.data.data.meta.total)
    } catch (e) {
      setError(true)
      console.log(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    callApi(lazyParams.page + 1)
  }, [lazyParams])

  const onPage = (event: any) => {
    setLazyParams(event)
  }

  const onRowEditChange = (e: any) => {
    setEditingRows(e.data)
  }

  const onRowEditComplete = (e: any) => {
    const _users = [...users]
    const { newData, index } = e

    newData.birth_date = formatDate(newData.birth_date)

    _users[index] = newData

    setUsers(_users)
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Users Manage</h5>
        <div className="flex">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Keyword Search" />
          </span>
          <Tippy content="New User" arrow={false}>
            <div>
              <Button icon="pi pi-plus" className="ml-2 !px-5" />
            </div>
          </Tippy>
        </div>
      </div>
    )
  }

  useTitle(`Pharmacy - ${category}`)
  return (
    <div className="grid-cols-12">
      <div className="card">
        {error ? (
          <div>No result</div>
        ) : (
          <DataTable
            className="border-collapse"
            header={renderHeader()}
            value={users}
            paginator
            rows={10}
            loading={loading}
            responsiveLayout="scroll"
            size="small"
            lazy
            totalRecords={totalRecords}
            onPage={onPage}
            first={lazyParams.first}
            editMode="row"
            editingRows={editingRows}
            onRowEditChange={onRowEditChange}
            onRowEditComplete={onRowEditComplete}
            rowHover
            emptyMessage="No user found!"
          >
            <Column field="id" header="Id" className="min-w-[5rem]" />
            <Column
              field="username"
              header="Username"
              className="min-w-[14rem]"
              editor={options => textEditor(options)}
              filter
              filterPlaceholder="Search by Username..."
            />
            <Column
              field="first_name"
              header="First Name"
              className="min-w-[14rem]"
              editor={options => textEditor(options)}
              filter
              filterPlaceholder="Search by First Name..."
            />
            <Column
              field="last_name"
              header="Last Name"
              className="min-w-[14rem]"
              editor={options => textEditor(options)}
              filter
              filterPlaceholder="Search by Last Name..."
            />
            <Column
              field="birth_date"
              header="Birth Date"
              className="min-w-[10rem]"
              editor={options => dateEditor(options)}
            />
            <Column
              field="phone"
              header="Phone"
              className="min-w-[14rem]"
              editor={options => textEditor(options)}
              filter
              filterPlaceholder="Search by Phone Number..."
            />
            <Column
              field="user_role"
              header="Role"
              className="min-w-[8rem]"
              editor={options => roleSelector(options)}
            />
            <Column
              rowEditor
              className="min-w-[6rem] w-[8%]"
              bodyStyle={{ textAlign: 'center' }}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  )
}

export default ManageUser

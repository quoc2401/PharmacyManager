import { FC, useState, useEffect, MouseEventHandler } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column'
import {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  deleteUsers
} from '../../api/userApi'
import { User } from '../../shared/types'
import { textEditor, dateEditor, roleSelector } from '../../components/Editors'
import { formatDate, prependArray } from '../../shared/utils'
import { InputText } from 'primereact/inputtext'
import { UserField, roles } from '../../shared/constant'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FilterMatchMode } from 'primereact/api'
import { deleteDialogFooter, newDialogFooter } from '../../components/DialogFooters'

const emptyUser = {
  id: 0,
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  birth_date: null,
  phone: '',
  user_role: 'EMPLOYEE',
  created_at: '',
  updated_at: ''
}

const ManageUser: FC = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [editingRows, setEditingRows] = useState([])
  const [user, setUser] = useState<User>(emptyUser)
  const [newDialog, setNewDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    username: { value: '', matchMode: FilterMatchMode.CONTAINS },
    first_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    last_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    phone: { value: '', matchMode: FilterMatchMode.CONTAINS }
  })

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  })

  let lazyTimeOut = 

  useEffect(() => {
    loadUsers()
  }, [lazyParams, filters])

  //functions
  const loadUsers = () => {
    if (lazyTimeOut != null) {
      clearTimeout(lazyTimeOut)
    }

    lazyTimeOut = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await getUsers(filters, lazyParams.page + 1)

        setUsers(res.data.data)
        setTotalRecords(res.data.meta.total)
      } catch (e) {
        console.log(e)
      }

      setLoading(false)
    }, 1000)
  }

  //create
  const saveUser = async () => {
    setLoading(true)
    try {
      const res = await createUser(user)
      const data = res.data.data
      setUsers(prev => {
        prev = prependArray(data, prev)

        console.log(prev)
        return prev
      })
      toast.success('Create success')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setNewDialog(false)
  }

  //update
  const onRowEditComplete = async (e: any) => {
    setLoading(true)
    const _users = [...users]
    const { newData, index } = e

    newData.birth_date = formatDate(newData.birth_date)

    _users[index] = newData
    try {
      const res = await updateUser(newData)

      console.log(res)

      if (res.status == 200) setUsers(_users)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  //delete
  const deleteSelectedUsers = async () => {
    setLoading(true)
    try {
      if (selectedUsers.length == 1) await deleteUser(selectedUsers[0])
      else await deleteUsers(selectedUsers)

      const _users = users.filter(val => !selectedUsers.includes(val))

      setSelectedUsers([])
      setUsers(_users)
      setDeleteDialog(false)
      toast.success('delete success')

      loadUsers()
    } catch (error) {
      console.log(error)
    }
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    const _filters = { ...filters }
    // _filters['global'].value = value;

    if (isNaN(value)) {
      filters['username'].value = value
      filters['last_name'].value = value
      filters['first_name'].value = value
      filters['phone'].value = ''
    } else {
      filters['username'].value = value
      filters['last_name'].value = ''
      filters['first_name'].value = ''
      filters['phone'].value = value
    }

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilter = (field: UserField, value: string) => {
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

  const onRowEditChange = (e: any) => {
    setEditingRows(e.data)
  }

  const customFilter = (field: UserField, placeholder: string) => {
    return (
      <InputText
        value={filters[field].value}
        placeholder={placeholder}
        onChange={e => handleFilter(field, e.target.value)}
        className="rounded-md"
      />
    )
  }

  const openNew = () => {
    setUser(emptyUser)
    setNewDialog(true)
  }

  const hideNewDialog = () => {
    setNewDialog(false)
  }

  const hideDeleteDialog = () => {
    setDeleteDialog(false)
  }

  const confirmDeleteSelected = () => {
    setDeleteDialog(true)
  }

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="rounded-md mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger rounded-md mr-2"
          onClick={confirmDeleteSelected}
          disabled={!selectedUsers || !selectedUsers.length}
        />
      </>
    )
  }

  // const newDialogFooter = (yesAction: MouseEventHandler, noAction: MouseEventHandler) => {
  //   return (
  //     <>
  //       <Button label="Create" icon="pi pi-plus" className="rounded-md mr-2" onClick={yesAction} />
  //       <Button label="Cancel" icon="pi pi-times" className="p-button-danger rounded-md mr-2" onClick={noAction}/>
  //     </>
  // )
  // }
  
  // const deleteDialogFooter = (yesAction: MouseEventHandler, noAction: MouseEventHandler) => {
  //   return (
  //       <>
  //         <Button label="Yes" icon="pi pi-check" className="rounded-md mr-2" onClick={yesAction} />
  //         <Button label="No" icon="pi pi-times" className="p-button-danger rounded-md mr-2" onClick={noAction}/>
  //       </>
  //   )
  // } 

  const deleteDialogFooter = (
    yesAction: MouseEventHandler,
    noAction: MouseEventHandler
  ) => {
    return (
      <>
        <Button
          label="Yes"
          icon="pi pi-check"
          className="rounded-md mr-2"
          onClick={yesAction}
        />
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-danger rounded-md mr-2"
          onClick={noAction}
        />
      </>
    )
  }

  const handleInput = (value: string, field: UserField) => {
    const _user = { ...user }
    _user[field] = value
    setUser(_user)
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Users Manage</h5>
        <div className="flex">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              onChange={onGlobalFilterChange}
            />
          </span>
          {/* <Tippy content="New User" arrow={false}>
            <div>
              <Button icon="pi pi-plus" className="ml-2 !px-5" />
            </div>
          </Tippy> */}
        </div>
      </div>
    )
  }

  useTitle(`Pharmacy - Manage User`)
  return (
    <div className="grid-cols-12">
      <div className="card">
        <Toolbar left={leftToolbarTemplate}></Toolbar>
        <DataTable
          className=""
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
          globalFilterFields={['username', 'fisrt_name']}
          globalFilter={globalFilterValue}
          filterDisplay="row"
          filters={filters}
          selection={selectedUsers}
          onSelectionChange={e => setSelectedUsers(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column field="id" header="Id" className="min-w-[5rem]" />
          <Column
            field="username"
            header="Username"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              UserField.USERNAME,
              'Search by Username...'
            )}
          />
          <Column
            field="first_name"
            header="First Name"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              UserField.FIRST_NAME,
              'Search by First Name...'
            )}
          />
          <Column
            field="last_name"
            header="Last Name"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              UserField.LAST_NAME,
              'Search by Last Name...'
            )}
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
            showFilterMenu={false}
            filterType="number"
            filterElement={customFilter(
              UserField.PHONE,
              'Search by Phone Number...'
            )}
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
      </div>
      <Dialog
        visible={newDialog}
        header="New User"
        modal
        className="p-fluid w-[40%]"
        footer={newDialogFooter(saveUser, hideNewDialog)}
        onHide={hideNewDialog}
      >
        <div className="field mb-5">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            name="username"
            value={user.username}
            required
            autoFocus
            placeholder="Enter username..."
            className="rounded-md"
            onChange={e => handleInput(e.target.value, UserField.USERNAME)}
          />
        </div>
        <div className="field mb-5">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            name="password"
            value={user.password}
            required
            placeholder="Enter password..."
            className="rounded-md"
            onChange={e => handleInput(e.target.value, UserField.PASSWORD)}
          />
        </div>
        <div className="flex mb-5 space-x-2">
          <div className="field">
            <label htmlFor="first_name">First Name</label>
            <InputText
              id="first_name"
              name="first_name"
              value={user.first_name}
              required
              placeholder="Enter First Name..."
              className="rounded-md"
              onChange={e => handleInput(e.target.value, UserField.FIRST_NAME)}
            />
          </div>
          <div className="field">
            <label htmlFor="last_name">Last Name</label>
            <InputText
              id="last_name"
              name="last_name"
              value={user.last_name}
              required
              placeholder="Enter Last Name..."
              className="rounded-md"
              onChange={e => handleInput(e.target.value, UserField.LAST_NAME)}
            />
          </div>
        </div>
        <div className="field mb-5">
          <label htmlFor="birth_date">Birth Date</label>
          <Calendar
            id="birth_date"
            name="birth_date"
            value={new Date(Date.parse(user.birth_date || ''))}
            showIcon
            dateFormat="yy-mm-dd"
            placeholder="Choose Birth Date..."
            onChange={e =>
              handleInput(formatDate(e.target.value), UserField.BIRTH_DATE)
            }
          />
        </div>
        <div className="field mb-5">
          <label htmlFor="phone">Phone</label>
          <InputText
            id="phone"
            name="phone"
            value={user.phone || ''}
            required
            placeholder="Enter Phone number..."
            className="rounded-md"
            onChange={e => handleInput(e.target.value, UserField.PHONE)}
          />
        </div>
        <div className="field mb-5">
          <label htmlFor="user_role">User Role</label>
          <Dropdown
            id="user_role"
            name="user_role"
            value={user.user_role}
            options={roles}
            optionLabel="name"
            optionValue="code"
            onChange={e => handleInput(e.target.value, UserField.USER_ROLE)}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDialogFooter(deleteSelectedUsers, hideDeleteDialog)}
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {user && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  )
}

export default ManageUser

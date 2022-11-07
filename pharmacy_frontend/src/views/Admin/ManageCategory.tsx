import { FC, useState, useEffect, MouseEventHandler, useRef } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  deleteUsers
} from '../../api/userApi'
import { Category, User } from '../../shared/types'
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
import { newDialogFooter } from '../../shared/DialogFooters'
import { roleBodyTemplate, roleItemTemplate } from '../../shared/templates'

const emptyCategory = {
  id: 0,
  name: '',
  description: ''
}

const ManageCategory: FC = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [editingRows, setEditingRows] = useState([])
  const [category, setCategory] = useState<Category>(emptyCategory)
  const [newDialog, setNewDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    username: { value: '', matchMode: FilterMatchMode.CONTAINS },
    first_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    last_name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    phone: { value: '', matchMode: FilterMatchMode.CONTAINS },
    user_role: { value: '', matchMode: FilterMatchMode.EQUALS }
  })

  const lazyTimeOut = useRef<ReturnType<typeof setTimeout>>()

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  })

  useEffect(() => {
    // loadUsers()
  }, [lazyParams, filters])

  //functions
//   const loadUsers = () => {
//     lazyTimeOut.current = setTimeout(async () => {
//       setLoading(true)
//       try {
//         const res = await getUsers(filters, lazyParams.page + 1)

//         setUsers(res.data.data)
//         setTotalRecords(res.data.meta.total)
//       } catch (e) {
//         console.log(e)
//       }

//       setLoading(false)
//     }, 1000)

//     return () => clearTimeout(lazyTimeOut.current)
//   }

  //create
//   const saveUser = async () => {
//     setLoading(true)
//     try {
//       const res = await createUser(user)
//       const data = res.data.data
//       setUsers(prev => {
//         prev = prependArray(data, prev)

//         return prev
//       })
//       toast.success('Create success')
//     } catch (error) {
//       console.log(error)
//     }
//     setLoading(false)
//     setNewDialog(false)
//   }

  //update
//   const onRowEditComplete = async (e: any) => {
//     setLoading(true)
//     const _users = [...users]
//     const { newData, index } = e

//     newData.birth_date = formatDate(newData.birth_date)

//     _users[index] = newData
//     try {
//       const res = await updateUser(newData)

//       console.log(res)

//       if (res.status == 200) setUsers(_users)
//     } catch (error) {
//       console.log(error)
//     }
//     setLoading(false)
//   }

  //delete
//   const deleteSelectedUsers = async () => {
//     setLoading(true)
//     try {
//       if (selectedUsers.length == 1) await deleteUser(selectedUsers[0])
//       else await deleteUsers(selectedUsers)

//       const _users = users.filter(val => !selectedUsers.includes(val))

//       setSelectedUsers([])
//       setUsers(_users)
//       setDeleteDialog(false)
//       toast.success('delete success')

//       loadUsers()
//     } catch (error) {
//       console.log(error)
//     }
//   }

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

  const customRoleFilter = (field: UserField) => {
    return (
      <Dropdown
        optionLabel="name"
        optionValue="code"
        value={filters[field].value}
        options={roles}
        itemTemplate={roleItemTemplate}
        placeholder="Search by role"
        className="rounded-md"
        onChange={e => handleFilter(field, e.target.value)}
      />
    )
  }

  const clearFilter = (field: UserField) => {
    setFilters(prev => {
      const _filters = { ...prev }
      _filters[field].value = ''

      return _filters
    })
  }

  const openNew = () => {
    setCategory(emptyCategory)
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
          disabled={!selectedCategories || !selectedCategories.length}
        />
      </>
    )
  }

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
    const _category = { ...category }
    _category[field] = value
    setCategory(_category)
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
          value={categories}
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
        //   onRowEditComplete={onRowEditComplete}
          rowHover
          emptyMessage="No user found!"
          globalFilterFields={['username', 'fisrt_name']}
          globalFilter={globalFilterValue}
          filterDisplay="row"
          filters={filters}
          selection={selectedCategories}
          onSelectionChange={e => setSelectedCategories(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column field="id" header="Id" className="min-w-[3rem]" />
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
            onFilterClear={() => clearFilter(UserField.USERNAME)}
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
            onFilterClear={() => clearFilter(UserField.FIRST_NAME)}
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
            onFilterClear={() => clearFilter(UserField.LAST_NAME)}
          />
          <Column
            field="birth_date"
            header="Birth Date"
            className="min-w-[8rem]"
            editor={options => dateEditor(options)}
          />
          <Column
            field="phone"
            header="Phone"
            className="min-w-[12rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterType="number"
            filterElement={customFilter(
              UserField.PHONE,
              'Search by Phone Number...'
            )}
            onFilterClear={() => clearFilter(UserField.PHONE)}
          />
          <Column
            field="user_role"
            header="Role"
            className="min-w-[8rem]"
            editor={options => roleSelector(options)}
            body={roleBodyTemplate}
            filter
            filterElement={customRoleFilter(UserField.USER_ROLE)}
            onFilterClear={() => clearFilter(UserField.USER_ROLE)}
            showFilterMenu={false}
          />
          <Column
            rowEditor
            className="min-w-[6rem] w-[8%]"
            bodyStyle={{ textAlign: 'center' }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={newDialog}
        header="New User"
        modal
        className="p-fluid w-[40%]"
        // footer={newDialogFooter(saveUser, hideNewDialog)}
        onHide={hideNewDialog}
      >
        <div className="field mb-5">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            name="username"
            value={category.name}
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
            value={category.description}
            required
            placeholder="Enter password..."
            className="rounded-md"
            onChange={e => handleInput(e.target.value, UserField.PASSWORD)}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        // footer={deleteDialogFooter(deleteSelectedUsers, hideDeleteDialog)}
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {<span>Are you sure you want to delete the selected items?</span>}
        </div>
      </Dialog>
    </div>
  )
}

export default ManageCategory

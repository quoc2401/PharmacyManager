import { FC, useState, useEffect, MouseEventHandler } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { createMedicineApi, getMedicinesApi } from '../../api/medicineApi'
import { Medicine } from '../../shared/types'
import { textEditor, dateEditor } from '../../components/Editors'
import { formatDate, prependArray } from '../../shared/utils'
import { InputText } from 'primereact/inputtext'
import { roles, MedicineField } from '../../shared/constant'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FilterMatchMode } from 'primereact/api'
import { deleteDialogFooter, newDialogFooter } from '../../shared/DialogFooters'
import { imageBodyTemplate } from '../../shared/templates'

const emptyMedicine = {
  id: 0,
  name: '',
  category_id: '',
  unit_price: 0,
  unit_in_stock: 0,
  describe: '',
  image: '',
  uses: '',
  trademark: '',
  discontinued: 0
}

let lazyTimeOut: ReturnType<typeof setTimeout>

const ManageMedicine: FC = () => {
  const [loading, setLoading] = useState(false)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [editingRows, setEditingRows] = useState([])
  const [medicine, setMedicine] = useState<Medicine>(emptyMedicine)
  const [newDialog, setNewDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([])
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    describe: { value: '', matchMode: FilterMatchMode.CONTAINS },
    uses: { value: '', matchMode: FilterMatchMode.CONTAINS },
    trademark: { value: '', matchMode: FilterMatchMode.CONTAINS },
    category_id: { value: '', matchMode: FilterMatchMode.EQUALS }
  })

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  })

  useEffect(() => {
    loadMeds()
  }, [lazyParams, filters])

  //functions
  const loadMeds = () => {
    lazyTimeOut = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await getMedicinesApi(lazyParams.page + 1, filters)
        console.log(res.data.data)
        setMedicines(res.data.data)
        setTotalRecords(res.data.meta.total)
      } catch (e) {
        console.log(e)
      }

      setLoading(false)
    }, 1000)

    return () => clearTimeout(lazyTimeOut)
  }

  //create
  const saveMedicine = async () => {
    setLoading(true)
    try {
      //   const res = await createMedicineApi(medicine)
      //   const data = res.data.data
      //   setMedicines(prev => {
      //     prev = prependArray(data, prev)

      //     return prev
      //   })
      toast.success('Create success')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setNewDialog(false)
  }

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

    filters['name'].value = value
    filters['uses'].value = value
    filters['describe'].value = value
    filters['trademark'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilter = (field: MedicineField, value: string) => {
    if (lazyTimeOut != null) {
      clearTimeout(lazyTimeOut)
    }
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

  const customFilter = (field: MedicineField, placeholder: string) => {
    return (
      <InputText
        value={filters['name'].value}
        placeholder={placeholder}
        onChange={e => handleFilter(field, e.target.value)}
        className="rounded-md"
      />
    )
  }

  const clearFilter = (field: MedicineField) => {
    setFilters(prev => {
      const _filters = { ...prev }
      _filters[field].value = ''

      return _filters
    })
  }

  const openNew = () => {
    setMedicine(emptyMedicine)
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
          disabled={!selectedMedicines || !selectedMedicines.length}
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

  const handleInput = (field: MedicineField, value: string) => {
    setMedicine(prev => {
      const _medicine = { ...prev }
      _medicine[field] = value

      return _medicine
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
          value={medicines}
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
          emptyMessage="No medicine found!"
          globalFilterFields={['username', 'fisrt_name']}
          globalFilter={globalFilterValue}
          filterDisplay="row"
          filters={filters}
          selection={selectedMedicines}
          onSelectionChange={e => setSelectedMedicines(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column field="id" header="Id" className="min-w-[3rem]" />
          <Column
            field="name"
            header="Name"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              MedicineField.NAME,
              'Search by Username...'
            )}
            onFilterClear={() => clearFilter(MedicineField.NAME)}
          />
          <Column
            field="category_id"
            header="Category"
            className="min-w-[3rem]"
            // editor={options => textEditor(options)}
            // filter
            // showFilterMenu={false}
            // filterElement={customFilter(
            //     MedicineField.CATEGORY,
            //   'Search by First Name...'
            // )}
            // onFilterClear={() => clearFilter(MedicineField.CATEGORY)}
            align="center"
          />
          <Column
            field="unit_price"
            header="Unit Price"
            className="min-w-[8rem]"
            editor={options => textEditor(options)}
            align="center"
          />
          <Column
            field="unit_in_stock"
            header="Unit in stock"
            className="min-w-[8rem]"
            align="center"
          />
          <Column
            field="describe"
            header="Quantity per unit"
            className="min-w-[12rem]"
            editor={options => textEditor(options)}
          />
          <Column
            field="uses"
            header="Uses"
            className="min-w-[26rem]"
            editor={options => textEditor(options)}
          />
          <Column
            field="trademark"
            header="Trademark"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
          />
          <Column
            field="image"
            header="Image"
            className="min-w-[4rem]"
            editor={options => textEditor(options)}
            body={imageBodyTemplate}
          />
          <Column
            field="discontinued"
            header="Discontinued"
            className="min-w-[2rem]"
            editor={options => textEditor(options)}
            align="center"
          />
          <Column
            rowEditor
            className="min-w-[6rem] w-[5%]"
            bodyStyle={{ textAlign: 'center' }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={newDialog}
        header="New User"
        modal
        className="p-fluid w-[40%]"
        // footer={newDialogFooter(save, hideNewDialog)}
        onHide={hideNewDialog}
      >
        {/* <div className="field mb-5">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            name="name"
            value={medicine.name}
            required
            autoFocus
            placeholder="Enter name..."
            className="rounded-md"
            onChange={e => handleInput(e.target.value, UserField.USERNAME)}
          />
        </div>
        <div className="field mb-5">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            name="password"
            value={medicine.describe}
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
        </div> */}
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

export default ManageMedicine

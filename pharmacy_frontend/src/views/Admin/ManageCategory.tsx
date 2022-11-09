import { FC, useState, useEffect, useRef } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Category } from '../../shared/types'
import { textEditor} from '../../components/Editors'
import { prependArray } from '../../shared/utils'
import { InputText } from 'primereact/inputtext'
import { CategoryField } from '../../shared/constant'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { FilterMatchMode } from 'primereact/api'
import { newDialogFooter, deleteDialogFooter } from '../../shared/DialogFooters'
import { createCategoryApi, deleteCategoriesApi, deleteCategoryApi, getCategoriesApi, updateCategoryApi } from '../../api/categoryApi'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const emptyCategory = {
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
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    description: { value: '', matchMode: FilterMatchMode.CONTAINS }
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
        const res = await getCategoriesApi(lazyParams.page + 1, filters)

        setCategories(res.data.data)
        setTotalRecords(res.data.meta.total)
      } catch (e) {
        console.log(e)
      }

      setLoading(false)
  }
  const formik = useFormik<Category>({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required()
    }),
    onSubmit: async (value) => {
      setLoading(true)
      try {
        const res = await createCategoryApi(value)
        const data = res.data.data

        if(res.status === 200) {
          toast.success("create success")
          setCategories(prev => {
            prev = prependArray(data, prev)
            return prev
          })
          formik.setValues(emptyCategory)
          setNewDialog(false)
        }
      } catch (error) {
        toast.error("failed to create")
        console.log(error)
      }
      setLoading(false)
    }
  })

  // update
  const onRowEditComplete = async (e: any) => {
    setLoading(true)
    const _categories = [...categories]
    const { newData, index } = e

    _categories[index] = newData
    
    setCategories(_categories)
    try {
      const res = await updateCategoryApi(newData)

      console.log(res)

      if (res.status == 200)
        toast.success("update success")
    } catch (error) {
      console.log(error)
      setCategories(categories)
      toast.error("failed to update")
    }
    setLoading(false)
  }

  //delete
  const deleteSelectedCategories = async () => {
    setLoading(true)
    try {
      if (selectedCategories.length == 1) await deleteCategoryApi(selectedCategories[0].id)
      else await deleteCategoriesApi(selectedCategories)

      const _categories = categories.filter(val => !selectedCategories.includes(val))

      setSelectedCategories([])
      setCategories(_categories)
      setDeleteDialog(false)
      toast.success('delete success')
    } catch (error) {
      toast.error('failed to delete')
      console.log(error)
    }
    setLoading(false)
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    const _filters = { ...filters }

    filters.name.value = value
    filters.description.value = value
    

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilter = (field: CategoryField, value: string) => {
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

  const customFilter = (field: CategoryField, placeholder: string) => {
    return (
      <InputText
        value={filters[field].value}
        placeholder={placeholder}
        onChange={e => handleFilter(field, e.target.value)}
        className="rounded-md"
      />
    )
  }

  const clearFilter = (field: CategoryField) => {
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

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Users Manage</h5>
        <div className="flex">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
                className='rounded-md'
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
          onRowEditComplete={onRowEditComplete}
          rowHover
          emptyMessage="No categories found!"
          globalFilterFields={['name', 'description']}
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
            field="name"
            header="Name"
            className="min-w-[20rem] whitespace-nowrap"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              CategoryField.NAME,
              'Search by name...'
            )}
            onFilterClear={() => clearFilter(CategoryField.NAME)}
          />
          <Column
            field="description"
            header="Description"
            className="min-w-[14rem]"
            editor={options => textEditor(options)}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              CategoryField.DESCRIPTION,
              'Search by description...'
            )}
            onFilterClear={() => clearFilter(CategoryField.DESCRIPTION)}
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
        footer={newDialogFooter(() => formik.submitForm(), hideNewDialog)}
        onHide={hideNewDialog}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="field mb-5">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              value={formik.values.name}
              required
              autoFocus
              placeholder="Enter name..."
              className="rounded-md"
              onChange={formik.handleChange}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="description">Description</label>
            <InputText
              id="description"
              name="description"
              value={formik.values.description}
              required
              placeholder="Enter description..."
              className="rounded-md"
              onChange={formik.handleChange}
            />
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDialogFooter(deleteSelectedCategories, hideDeleteDialog)}
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

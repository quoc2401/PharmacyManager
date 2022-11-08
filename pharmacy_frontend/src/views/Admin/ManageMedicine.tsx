import { FC, useState, useEffect, MouseEventHandler, useRef } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import {
  createMedicineApi,
  deleteMedicineApi,
  getMedicinesApi,
  patchDeleteMedicineApi,
  updateMedicineApi
} from '../../api/medicineApi'
import { getCategoriesApi } from '../../api/categoryApi'
import { Medicine, Category } from '../../shared/types'
import {
  textEditor,
  checkBoxEditor,
  imageSelector,
  textAreaEditor,
  categorySelector
} from '../../components/Editors'
import { isBool, prependArray } from '../../shared/utils'
import { InputText } from 'primereact/inputtext'
import { MedicineField } from '../../shared/constant'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FilterMatchMode } from 'primereact/api'
import { deleteDialogFooter, newDialogFooter } from '../../shared/DialogFooters'
import {
  discontinuedBodyTemplate,
  imageBodyTemplate
} from '../../shared/templates'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import { TriStateCheckbox } from 'primereact/tristatecheckbox'

const emptyMedicine: Medicine = {
  id: 0,
  name: '',
  category_id: 1,
  unit_price: 1000,
  unit_in_stock: 10,
  describe: '',
  image: '',
  uses: '',
  trademark: '',
  discontinued: 0,
  image_file: null
}

let lazyTimeOut: ReturnType<typeof setTimeout>

const ManageMedicine: FC = () => {
  const [loading, setLoading] = useState(false)
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [medicine, setMedicine] = useState<Medicine>(emptyMedicine)
  const [newDialog, setNewDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([])
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState({
    name: { value: '', matchMode: FilterMatchMode.CONTAINS },
    describe: { value: '', matchMode: FilterMatchMode.CONTAINS },
    uses: { value: '', matchMode: FilterMatchMode.CONTAINS },
    trademark: { value: '', matchMode: FilterMatchMode.CONTAINS },
    category_id: { value: '', matchMode: FilterMatchMode.EQUALS },
    discontinued: { value: null, matchMode: FilterMatchMode.EQUALS}
  })

  const tempUrl = useRef<string>()

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  })

  useEffect(() => {
    loadMeds()
    loadCategories()
  }, [lazyParams, filters])

  //functions
  const loadMeds = () => {
    lazyTimeOut = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await getMedicinesApi(lazyParams.page + 1, filters)

        setMedicines(res.data.data)
        setTotalRecords(res.data.meta.total)
      } catch (e) {
        console.log(e)
      }

      setLoading(false)
    }, 1000)

    return () => clearTimeout(lazyTimeOut)
  }

  const loadCategories = async () => {
    try {
      const res = await getCategoriesApi(0, null)
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik<Medicine>({
    initialValues: {
      ...emptyMedicine
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      category_id: Yup.number().required(),
      image_file: Yup.mixed().required()
    }),
    onSubmit: async value => {
      setLoading(true)
      try {
        console.log("asas")
        const formData = new FormData()
        Object.keys(value).map(k => {
          formData.append(k, value[k])
        })
        const res = await createMedicineApi(formData)
        const data = res.data.data

        if (res.status === 200) {
          setMedicines(prev => {
            prev = prependArray(data, prev)

            return prev
          })

          toast.success('create success')
          setNewDialog(false)
          formik.setValues(emptyMedicine)
        } else toast.error('failed to create')
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  })

  //update
  const updateMedicine = async (medicine: Medicine) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.keys(medicine).map(k => {
        formData.append(k, medicine[k])
      })
      const res = await updateMedicineApi(formData)

      // console.log(res)

      if (res.status !== 200) {
        loadMeds()
        toast.error('update failed')
      } else {
        toast.success('update success')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  //delete
    const deleteSelectedMedicines = async () => {
      setLoading(true)
      try {
        console.log(selectedMedicines)
        if (selectedMedicines.length == 1) await deleteMedicineApi(selectedMedicines[0].id)
        else await patchDeleteMedicineApi(selectedMedicines)

        const _medicines = medicines.filter(val => !selectedMedicines.includes(val))

        setSelectedMedicines([])
        setMedicines(_medicines)
        setDeleteDialog(false)
        toast.success('delete success')
      } catch (error) {
        console.log(error)
        toast.error('delete failed')
      }
      setLoading(false)
    }


  //filters
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

  const handleFilter = (field: MedicineField, value: any) => {
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

  const customCategoryFilter = (field: MedicineField) => {
    return (
      <Dropdown
        optionLabel="name"
        optionValue="id"
        value={filters[field].value}
        options={categories}
        placeholder="Search by category"
        className="rounded-md"
        onChange={e => handleFilter(field, e.target.value)}
      />
    )
  }

  const customDiscontinuedFilter = (field: MedicineField) => {
    return (
      <TriStateCheckbox
        value={
          filters.discontinued.value !== null ? Boolean(filters.discontinued.value) : null
        }
        placeholder="Search by category"
        className="rounded-md"
        onChange={e => {
          setFilters(prev => {
            const _filters = {...prev}
            const value = e.value
            _filters['discontinued'].value = (value === null || value === undefined) ? null : +value as any
            return _filters
          })
        }}
        
      />
    )
  }

  const onPage = (event: any) => {
    setLazyParams(event)
  }

  const onCellEditComplete = (e: any) => {
    const { rowData, newValue, field, originalEvent: event } = e
    if(rowData[field] == newValue)
      return
      
    switch (field) {
      case 'category_id':
        rowData[field] = newValue
        break
      case 'unit_price':
        if (newValue < 1000 && newValue % 1000 !== 0) event.preventDefault()
        else rowData[field] = newValue
        break
      case 'unit_in_stock':
        if (newValue < 0) event.preventDefault()
        else rowData[field] = newValue
        break
      case 'discontinued':
        rowData[field] = newValue
        break
      case 'image':
        if (tempUrl.current !== null && tempUrl.current !== undefined)
          URL.revokeObjectURL(tempUrl.current)

        rowData['image_file'] = newValue
        tempUrl.current = URL.createObjectURL(newValue)
        rowData[field] = tempUrl.current

        break
      default:
        if (newValue.trim().length > 0) rowData[field] = newValue
        else event.preventDefault()
        break
    }
    updateMedicine(rowData)
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
      _filters[field].value = null

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

  useTitle(`Pharmacy - Manage Medicine`)
  return (
    <div className="grid-cols-12 max-w-full overflow-hidden">
      <div className="card">
        <Toolbar left={leftToolbarTemplate}></Toolbar>
        <DataTable
          className=""
          header={renderHeader()}
          value={medicines}
          paginator
          rows={5}
          loading={loading}
          responsiveLayout="scroll"
          size="small"
          lazy
          totalRecords={totalRecords}
          onPage={onPage}
          first={lazyParams.first}
          editMode="cell"
          selectOnEdit={false}
          rowHover
          emptyMessage="No medicine found!"
          globalFilterFields={['username', 'first_name']}
          globalFilter={globalFilterValue}
          filterDisplay="row"
          filters={filters}
          selection={selectedMedicines}
          onSelectionChange={e => setSelectedMedicines(e.value)}
          selectionAutoFocus={false}
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
            className="min-w-[10rem]"
            editor={options => textEditor(options)}
            onCellEditComplete={onCellEditComplete}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              MedicineField.NAME,
              'Search by name...'
            )}
            onFilterClear={() => clearFilter(MedicineField.NAME)}
          />
          <Column
            field="category_id"
            body={rowData =>
              categories.find(c => c.id === rowData.category_id)?.name
            }
            header="Category"
            className="min-w-[16rem]"
            editor={options => categorySelector(options, categories)}
            cellEditValidator={e => {
              if (e.originalEvent.target['nodename'] == 'LI') return false
              return true
            }}
            onCellEditComplete={onCellEditComplete}
            filter
            showFilterMenu={false}
            filterElement={customCategoryFilter(
                MedicineField.CATEGORY
            )}
            onFilterClear={() => clearFilter(MedicineField.CATEGORY)}
          />
          <Column
            field="unit_price"
            header="Unit Price"
            className="min-w-[8rem]"
            editor={options => textEditor(options, 'number', 1000)}
            onCellEditComplete={onCellEditComplete}
            align="center"
          />
          <Column
            field="unit_in_stock"
            header="Unit in stock"
            className="min-w-[8rem]"
            editor={options => textEditor(options, 'number')}
            onCellEditComplete={onCellEditComplete}
            align="center"
          />
          <Column
            field="describe"
            header="Describe"
            className="min-w-[12rem]"
            editor={options => textEditor(options)}
            onCellEditComplete={onCellEditComplete}
          />
          <Column
            field="uses"
            header="Uses"
            className="min-w-[30rem]"
            editor={options => textAreaEditor(options)}
            onCellEditComplete={onCellEditComplete}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              MedicineField.USES,
              'Search by uses...'
            )}
            onFilterClear={() => clearFilter(MedicineField.USES)}
          />
          <Column
            field="trademark"
            header="Trademark"
            className="min-w-[10rem]"
            editor={options => textEditor(options)}
            onCellEditComplete={onCellEditComplete}
            filter
            showFilterMenu={false}
            filterElement={customFilter(
              MedicineField.TRADEMARK,
              'Search by trademark...'
            )}
            onFilterClear={() => clearFilter(MedicineField.TRADEMARK)}
          />
          <Column
            field="image"
            header="Image"
            className="min-w-[6rem]"
            editor={options => imageSelector(options)}
            onCellEditComplete={onCellEditComplete}
            body={imageBodyTemplate}
          />
          <Column
            field="discontinued"
            header="Discontinued"
            className="min-w-[2rem]"
            body={discontinuedBodyTemplate}
            editor={options => checkBoxEditor(options)}
            onCellEditComplete={onCellEditComplete}
            filter
            showFilterMenu={false}
            filterElement={customDiscontinuedFilter(MedicineField.DISCONTINUED)}
            onFilterClear={() => clearFilter(MedicineField.DISCONTINUED)}
            align="center"
          />
        </DataTable>
      </div>
      
      <Dialog
        visible={newDialog}
        header="New Medicine"
        modal
        className="p-fluid w-[40%]"
        footer={newDialogFooter(() => formik.submitForm(), hideNewDialog)}
        onHide={hideNewDialog}
      >
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="field mb-5">
            <label htmlFor="name">Name</label>
            {formik.errors.name && (
              <p className="text-xs text-red-500 ml-1">
                {formik.errors.name}
              </p>
            )}
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
            <label htmlFor="category_id">Category</label>
            <Dropdown
              id="category_id"
              name="category_id"
              className="field"
              value={formik.values.category_id}
              options={categories}
              optionLabel="name"
              optionValue="id"
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex mb-5 space-x-2">
            <div className="field">
              <label htmlFor="unit_price">Unit Price</label>
              <InputText
                id="unit_price"
                name="unit_price"
                value={formik.values.unit_price}
                required
                type="number"
                step="1000"
                placeholder="Enter unit price..."
                className="rounded-md"
                onChange={formik.handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="unit_in_stock">Unit in stock</label>
              <InputText
                id="unit_in_stock"
                name="unit_in_stock"
                value={formik.values.unit_in_stock}
                type="number"
                required
                placeholder="Enter unit in stock..."
                className="rounded-md"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="field mb-5">
            <label htmlFor="describe">Describe</label>
            <InputText
              id="describe"
              name="describe"
              value={formik.values.describe}
              required
              placeholder="Enter describe..."
              className="rounded-md"
              onChange={formik.handleChange}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="uses">Uses</label>
            <InputText
              id="uses"
              name="uses"
              value={formik.values.uses}
              placeholder="Enter uses..."
              className="rounded-md"
              onChange={formik.handleChange}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="trademark">Trademark</label>
            <InputText
              id="trademark"
              name="trademark"
              required
              value={formik.values.trademark}
              placeholder="Enter trademark..."
              className="rounded-md"
              onChange={formik.handleChange}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="file">Image</label>
            <FileUpload
              id="file"
              name="file"
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              className="rounded-md"
              onSelect={e => {
                formik.setFieldValue('image_file', e.files[0])
              }}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="discontinued">Discontinued</label>
            <Checkbox
              id="discontinued"
              name="discontinued"
              checked={formik.values.discontinued}
              type="checkbox"
              className="rounded-md"
              onChange={e => formik.setFieldValue('discontinued', e.checked)}
              trueValue={1}
              falseValue={0}
            />
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDialogFooter(deleteSelectedMedicines, hideDeleteDialog)}
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

import { Skeleton } from 'primereact/skeleton'
import { Dropdown } from 'primereact/dropdown'
import { FC, useEffect, useState } from 'react'
import { getCategoriesApi } from '../api/categoryApi'
import { Category } from '../shared/types'

interface CategoryDropdownProps {
  selectedItem: any
  setSelectedItem: (e: any) => void
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  selectedItem,
  setSelectedItem
}) => {
  const [categories, setCategories] = useState<Category[] | []>([])
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(0)

  const getData = async () => {
    setLoading(true)
    try {
      const res = await getCategoriesApi(null, null)
      setCategories(res.data.data)
      setSize(res.data.meta.total)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onItemChange = (e: any) => {
    console.log(selectedItem)
    setSelectedItem(e.value)
  }

  return (
    <div className="min-w-[300px]">
      <Dropdown
        className="w-full"
        value={selectedItem}
        onChange={prev => onItemChange(prev)}
        placeholder="Select Category"
        optionLabel="name"
        options={categories}
        virtualScrollerOptions={{
          lazy: true,
          onLazyLoad: getData,
          itemSize: size,
          showLoader: true,
          loading: loading,
          loadingTemplate: options => {
            return (
              <div
                className="flex align-items-center p-2"
                style={{ height: '40px' }}
              >
                <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
              </div>
            )
          }
        }}
      />
    </div>
  )
}

export default CategoryDropdown

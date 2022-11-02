import React, { FC } from 'react'
import { Medicine } from '../shared/types'
import MedicineItem from './MedicineItem'
import { Skeleton } from 'primereact/skeleton'

interface GridItemProps {
  data: Medicine[] | []
  loading: boolean
}

const GridItem: FC<GridItemProps> = ({ data, loading }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
      {!loading ? (
        data.map((item, index) => <MedicineItem item={item} key={index} />)
      ) : (
        <>
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
          <Skeleton height="320px" />
        </>
      )}
    </div>
  )
}

export default GridItem

import { Skeleton } from 'primereact/skeleton'
import { FC } from 'react'

interface StatisItemProps {
  item: {
    name: string
    total: number | string
    color: string
    icon: string
    new: number | string
  }
  loading: boolean
}

const StatisItem: FC<StatisItemProps> = ({ item, loading }) => {
  return (
    loading ?
      <Skeleton height='150px' className='mb-5'/>
    :
      <div className="card mb-0">
        <div className="flex justify-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-3">{item.name}</span>
            <div className="text-900 font-medium text-xl">{item.total}</div>
          </div>
          <div
            className={`flex items-center justify-center rounded w-[2.5rem] h-[2.5rem] ${item.color}`}
          >
            <i className={`text-xl ${item.icon}`}></i>
          </div>
        </div>
        <span className="text-green-500 font-medium"><span>{item.new}</span> {item.new < 0 ? '' : 'new'} </span>
        <span className="text-500">since last visit</span>
      </div>
  )
}

export default StatisItem

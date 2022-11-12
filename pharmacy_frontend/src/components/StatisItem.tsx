import { FC } from 'react'

interface StatisItemProps {
  item: {
    name: string
    number: number | string
    color: string
    icon: string
  }
}

const StatisItem: FC<StatisItemProps> = ({ item }) => {
  return (
    <div className="card mb-0">
      <div className="flex justify-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">{item.name}</span>
          <div className="text-900 font-medium text-xl">{item.number}</div>
        </div>
        <div
          className={`flex items-center justify-center rounded w-[2.5rem] h-[2.5rem] ${item.color}`}
        >
          <i className={`text-xl ${item.icon}`}></i>
        </div>
      </div>
      <span className="text-green-500 font-medium">24 new </span>
      <span className="text-500">since last visit</span>
    </div>
  )
}

export default StatisItem

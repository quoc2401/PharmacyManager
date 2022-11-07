import { User } from './types'
import { formatDate } from './utils'

export const roleBodyTemplate = (rowData: User) => {
  if (rowData.user_role === 'ADMIN')
    return (
      <div className="bg-red-200 rounded-sm font-bold text-center text-red-500">
        {rowData.user_role}
      </div>
    )
  else
    return (
      <div className="bg-green-200 rounded-sm font-bold text-center text-green-500">
        {rowData.user_role}
      </div>
    )
}

export const roleItemTemplate = (option: any) => {
  if (option.code === 'ADMIN')
    return (
      <div className="bg-red-200 rounded-sm font-bold text-center text-red-500">
        {option.name}
      </div>
    )
  else
    return (
      <div className="bg-green-200 rounded-sm font-bold text-center text-green-500">
        {option.name}
      </div>
    )
}

export const birthDateBodyTemplate = (rowData: any) => {
  return formatDate(rowData.birth_date)
}

export const imageBodyTemplate = (rowData: any) => {
  return <img src={rowData.image} alt={rowData.name}></img>
}

export const discontinuedBodyTemplate = (rowData: any) => {
  if (rowData.discontinued === 1)
    return (
      <div className="bg-red-200 rounded-sm font-bold text-center text-red-500">
        Yes
      </div>
    )
  else
    return (
      <div className="bg-green-200 rounded-sm font-bold text-center text-green-500">
        No
      </div>
    )
}

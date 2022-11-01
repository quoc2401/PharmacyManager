import {} from 'primereact/api'

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dynupxxry/image/upload/v1660532211/non-avatar_nw91c3.png'

export const formatDate = (value: any) => {
  let date = new Date(value)
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - offset * 60 * 1000)
  return date.toISOString().split('T')[0]
}

export const birthDateBodyTemplate = (rowData: any) => {
  return formatDate(rowData.birth_date)
}

export const convertParam = (param: string) => {
  return param.replace(/\s+/g, '-')
}

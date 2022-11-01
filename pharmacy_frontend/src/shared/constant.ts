import { Button } from 'primereact/button'
import { FC } from 'react'

export const roles = [
  { name: 'Admin', code: 'ADMIN' },
  { name: 'Employee', code: 'EMPLOYEE' }
]

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dynupxxry/image/upload/v1660532211/non-avatar_nw91c3.png'



// const deleteDialogFooter: FC = (yesAction: Function, noAction: Function) => {
//   return (
    
//   )
// }

export enum UserField {
  USERNAME = 'username',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  PHONE = 'phone',
  BIRTH_DATE = 'birth_date',
  USER_ROLE = 'user_role'

} 

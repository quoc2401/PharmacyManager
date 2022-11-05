import { Button } from 'primereact/button'
import React from 'react'
import { getCategoriesApi } from '../api/categoryApi';

export const roles = [
  { name: 'Admin', code: 'ADMIN' },
  { name: 'Employee', code: 'EMPLOYEE' }
]

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dynupxxry/image/upload/v1660532211/non-avatar_nw91c3.png'

export const convertParam = (param: string) => {
  return param.replace(/\s+/g, '-')
}

export enum UserField {
  USERNAME = 'username',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  PHONE = 'phone',
  BIRTH_DATE = 'birth_date',
  USER_ROLE = 'user_role'
}

export enum MedicineField {
  NAME = 'name',
  CATEGORY = 'category_id',
  UNIT_PRICE = 'unit_price',
  UNIT_IN_STOCK = 'unit_in_stock',
  DISCONTINUED = 'discontinued',
  IMAGE = 'image',
  DESCRIBE = 'describe',
  USES = 'uses',
  TRADEMARK = 'trademark',
  FILE = 'image_file'
}

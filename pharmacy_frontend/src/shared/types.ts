export interface User {
  id?: number
  username: string
  password: string
  first_name: string
  last_name: string
  birth_date: string | null
  phone: string | null
  user_role: string
  created_at: string
  updated_at: string | null
}

export interface Medicine {
  id?: number
  name: string
  category_id: number | string
  unit_price: number
  unit_in_stock: number | 0
  discontinued: number | false
  image?: string
  describe: string
  uses: string
  trademark: string
  image_file: File | null
}

export interface Category {
  id?: number
  name: string
  description: string
}

export interface OrderMedicine {
  medicine: Medicine
  quantity: number | null
}

export interface Order {
  order_details: Array<OrderMedicine>
  user_id: number | undefined
}

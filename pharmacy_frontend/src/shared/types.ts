export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  birth_date: string | null
  phone: string | null
  user_role: string
  created_at: string
  updated_at: string | null
}

export interface Medicine {
  id: number
  name: string
  category_id: number | string
  unit_price: string
  unit_in_stock: number | 0
  discontinued: number | string | 0
  image: string
  describe: string
  uses: string
  trademark: string
}

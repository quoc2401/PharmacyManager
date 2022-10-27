import React, { FC } from 'react'
import DrugItem from '../components/DrugItem'
import { useTitle } from '../hooks/useTitle'

const Login: FC = () => {
  useTitle('Pharmacy - Login')

  return (
    <div>
      <DrugItem />
    </div>
  )
}

export default Login

import React, { FC } from 'react'
import { useTitle } from '../../hooks/useTitle'

const Dashboard: FC = () => {
  useTitle('Pharmacy - Dashboard')

  return <div>Dashboard</div>
}

export default Dashboard

import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'

const Manage: FC = () => {
  const { category } = useParams()
  useTitle(`Pharmacy - ${category}`)

  return <div>Manage</div>
}

export default Manage

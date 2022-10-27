import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Detail: FC = () => {
  const { id } = useParams()

  return <div>Detail</div>
}

export default Detail

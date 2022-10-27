import React, { FC } from 'react'
import { useTitle } from '../../hooks/useTitle'

const Home: FC = () => {
  useTitle('Pharmacy - Home')

  return <div>Home</div>
}

export default Home

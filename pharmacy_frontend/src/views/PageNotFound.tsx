import React, { FC } from 'react'
import { useTitle } from '../hooks/useTitle'

const NotFound: FC = () => {
  useTitle('Page not found')

  return <div>404 - Page Not Found</div>
}

export default NotFound

import React, { FC } from 'react'
import { useTitle } from '../hooks/useTitle'

const PageNotFound: FC = () => {
  useTitle('Page not found')

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-200 z-[1000]"
      style={{
        backgroundImage:
          'url(https://demos.creative-tim.com/vue-argon-design-system-pro/img/ill/404.svg)',
        backgroundPosition: '50%',
        backgroundSize: 'cover'
      }}
    >
      <div className="text-center">
        <h1 className="text-8xl font-semibold text-slate-700">404</h1>
        <p className="text-xl mt-8 text-slate-500">Page not found :(</p>
        <p className="mt-4">Ooooups! Looks like you got lost.</p>
      </div>
    </div>
  )
}

export default PageNotFound

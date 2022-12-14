import { FC, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'react-cssfx-loading'
import Tippy from '@tippyjs/react'
import { logoutApi } from '../../api/authApi'
import Cart from '../CartOrder/Cart'
import { Menu } from 'primereact/menu'
import { toast } from 'react-toastify'
import { useStore } from '../../store'

interface HeaderProps {
  setOpenedSideBar: (e: boolean) => void
  openedSideBar: boolean
}

const Header: FC<HeaderProps> = ({ setOpenedSideBar, openedSideBar }) => {
  const currentUser = useStore(state => state.currentUser)
  const lastCount = useStore(state => state.lastCount)
  const logout = useStore(state => state.logout)
  const [isOpenedOrder, setIsOpenedOrder] = useState(false)
  const [loading, setLoading] = useState(false)
  const menu = useRef<Menu>(null)
  const menuMobile = useRef<Menu>(null)
  const menuItems = [
    {
      label: 'Your account info',
      icon: 'pi pi-user',
      command: () => {
        // window.location.pathname = '/user-info'
      }
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        handleLogout()
      }
    }
  ]
  const menuMobileItems = [
    {
      label: 'Order cart',
      icon: 'pi pi-shopping-cart',
      command: () => {
        // window.location.pathname = '/order-cart'
      }
    },
    {
      label: 'Your account info',
      icon: 'pi pi-user',
      command: () => {
        // window.location.pathname = '/user-info'
      }
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        handleLogout()
      }
    }
  ]

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logoutApi()
      logout()
      localStorage.setItem('last-count', '' + lastCount)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('An error occurred while logging out', { theme: 'colored' })
    }
  }

  return (
    <>
      <div className="fixed justify-between lg:justify-start top-0 left-0 w-full h-[5rem] bg-white shadow-md flex items-center px-6 text-slate-600 z-[1001]">
        <Link
          className="flex items-center font-medium text-xl order-2 lg:order-1 lg:w-[19rem]"
          to="/"
        >
          <img
            src="https://www.primefaces.org/atlantis-react/assets/layout/images/logo-dark.png"
            alt="logo"
            className="h-[2.2rem] mr-2"
          />
          <span>PHARMACY</span>
        </Link>

        <button
          className="p-link header-button order-1 lg:order-2 lg:ml-3"
          onClick={() => setOpenedSideBar(!openedSideBar)}
        >
          <i className="pi pi-bars text-xl"></i>
        </button>

        <div className="flex order-3 lg:ml-auto space-x-3">
          {currentUser?.user_role === 'EMPLOYEE' && (
            <Cart isOpened={isOpenedOrder} setIsOpened={setIsOpenedOrder} />
          )}

          <Tippy content="Menu" arrow={false}>
            <button
              aria-controls="menu"
              aria-haspopup
              className="p-link header-button"
              onClick={e => menu.current?.toggle(e)}
            >
              <i className="pi pi-user text-xl"></i>
            </button>
          </Tippy>
          <Menu ref={menu} model={menuItems} popup id="menu" />
        </div>
      </div>
      {loading && (
        <div className="fixed bg-overlay top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center z-[9999]">
          <CircularProgress color="#22c55e" />
        </div>
      )}
    </>
  )
}

export default Header

import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  setOpenedSideBar: (e: boolean) => void
  openedSideBar: boolean
  items: Array<{
    icon: string
    name: string
    path: string
  }>
}

const isActiveStyle =
  'flex items-center text-slate-700 font-medium py-2 px-3 rounded-md text-base transition-all transition-duration-300 bg-primary-50 p-link'
const notActiveStyle =
  'flex items-center text-slate-700 py-2 px-3 rounded-md text-base transition-all transition-duration-300 p-link'

const Sidebar: FC<SidebarProps> = ({
  openedSideBar,
  setOpenedSideBar,
  items
}) => {
  return (
    <>
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-overlay z-[1002] transition-all transition-duration-200 ${

          openedSideBar ? 'block' : 'hidden'
        }`}
        onClick={() => setOpenedSideBar(false)}
      ></div>
      <div
        className={`fixed shadow-md w-[300px] h-full lg:h-side-bar z-[1003] 
        top-0 lg:top-[6.2rem] left-0 lg:left-[1.5rem] bg-white transition-all 
        transition-duration-200 lg:rounded-md py-[1.5rem] px-[1rem] ${
          openedSideBar ? 'translate-x-0' : 'translate-x-[-100%] !left-0'
        }`}
      >
        <div>
          <ul className="list-none p-0 m-0">
            {items.map(item => (
              <li key={item.name} className="mt-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : notActiveStyle
                  }
                  end
                >
                  <i className={`text-md ${item.icon}`}></i>
                  <span className="ml-2">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar

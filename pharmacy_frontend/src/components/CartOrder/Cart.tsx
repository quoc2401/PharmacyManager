import { FC } from 'react'
import Tippy from '@tippyjs/react'
import ClickAwayListener from '../ClickAwayListener'

interface CartProps {
  isOpened: boolean
  setIsOpened: (e: boolean) => void
}

const Cart: FC<CartProps> = ({ isOpened, setIsOpened }) => {
  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      {ref => (
        <div ref={ref} className="relative flex flex-shrink-0 items-center">
          <Tippy content="Order Cart" arrow={false}>
            <button
              className="p-link header-button"
              onClick={() => setIsOpened(!isOpened)}
            >
              <i className="pi pi-shopping-cart text-xl"></i>
            </button>
          </Tippy>
          <div
            className={`absolute z-[11] h-96 right-0 w-full top-full flex w-[400px] flex-col items-stretch rounded-md origin-top-right border bg-white shadow-lg transition-all duration-200 ${
              isOpened
                ? 'visible scale-100 opacity-100'
                : 'invisible scale-0 opacity-0'
            }`}
          >
            <h3 className="text-md text-primary-100 font-semibold px-4 py-3">
              Current order
            </h3>

            <div className="w-100 border-b"></div>

            <div className="w-full h-full flex flex-col overflow-y-auto"></div>

            <div>
              
            </div>
          </div>
        </div>
      )}
    </ClickAwayListener>
  )
}

export default Cart

import { FC, useEffect, useRef } from 'react'

interface ClickAwayListenerProps {
  onClickAway: () => void
  children: (ref: any) => any
}

const ClickAwayListener: FC<ClickAwayListenerProps> = ({
  onClickAway,
  children
}) => {
  const childRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (e: any) => {
      if (childRef.current && !childRef.current?.contains(e.target)) {
        onClickAway && onClickAway()
      }
    }
    window.addEventListener('click', handler, true)

    return () => {
      window.removeEventListener('click', handler, true)
    }
  }, [onClickAway])

  return <>{children(childRef)}</>
}

export default ClickAwayListener

import React, { FC, useState, useRef, useEffect } from 'react'

interface ImgFadeProps {
  className: string
  // onLoad: (e: any) => void
  lazy_src: string
}

const ImgFade: FC<ImgFadeProps> = ({ className, lazy_src }) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        img?.setAttribute('src', lazy_src)
      }
    })

    if (img) {
      observer.observe(img)
    }

    return () => {
      if (img) {
        observer.unobserve(img)
      }
    }
  }, [lazy_src])

  return (
    <img
      ref={imgRef}
      alt="img"
      className={`${className} ${loaded ? 'animate-pulse' : ''}`}
      // onLoad={e => {
      //   setLoaded(true)
      //   onLoad && onLoad(e)
      // }}
    />
  )
}

export default ImgFade

'use client'
import { useState, useRef, useEffect } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

export const Dropdown = (props: { activeKey: string; values: {}; onChange: () => {} }) => {
  const { activeKey, values, onChange } = props
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (open && ref.current && ref.current && !ref.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    window.addEventListener('click', clickOutside)

    return () => {
      window.removeEventListener('click', clickOutside)
    }
  }, [ref, open])

  return (
    <div className="dropdown relative" ref={ref}>
      <div className="flex flex-row items-center justify-center">
        <div>{values[activeKey]?.value || activeKey}</div>
        <button onClick={handleOpen} className="p-4 hover:bg-gray-600 user-">
          {!open ? (
            <BiChevronDown className="pointer-events-none" />
          ) : (
            <BiChevronUp className="pointer-events-none" />
          )}
        </button>{' '}
      </div>
      {open ? (
        <ul className="dropdown_menu absolute z-50 rounded-md rounded-tr-none rounded-tl-none drop-shadow-md overflow-hidden">
          {Object.entries(values).map(([key, value]) => (
            <li
              key={key}
              className={`dropdown__item flex bg-slate-600 hover:bg-slate-500 cursor-pointer border-slate-300 ${
                activeKey === key && 'border-l-4'
              }`}
              onClick={() => {
                onChange(key)
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Dropdown

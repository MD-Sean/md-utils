import { RefObject, useEffect, useState } from 'react'

export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [value, setValue] = useState<boolean>(false)

  const handleMouseEnter = () => setValue(true)
  const handleMouseLeave = () => setValue(false)

  // @ts-ignore
  useEffect(() => {
    const node = elementRef?.current

    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter)
        node.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [elementRef])

  return value
}
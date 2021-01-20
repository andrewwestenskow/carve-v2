import React, { useRef, useEffect, useCallback } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, onDismiss: Function) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        event.stopPropagation()
        onDismiss()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onDismiss])
}

interface OAProps {
  onDismiss: Function
}

const OutsideAlerter: React.FC<OAProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideAlerter(wrapperRef, props.onDismiss)

  return <div ref={wrapperRef}>{props.children}</div>
}

export default OutsideAlerter

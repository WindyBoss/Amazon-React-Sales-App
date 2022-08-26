import { useState, useEffect } from 'react'

export const useModal = ({ isOpen = false, addFunc }) => {
  const [showModal, setShowModal] = useState(isOpen)
  const toggleModal = () => setShowModal((prevState) => !prevState)

  useEffect(() => {
    window.addEventListener('keydown', closeOnESC)

    if (!showModal) {
      addFunc()
    }

    return () => {
      window.removeEventListener('keydown', closeOnESC)
    }
  }, [addFunc, showModal])

  function closeOnESC(e) {
    if (e.code === 'Escape') {
      setShowModal(false)
    }
  }

  return [showModal, toggleModal]
}

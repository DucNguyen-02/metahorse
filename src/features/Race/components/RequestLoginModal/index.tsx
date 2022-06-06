import RequestLoginModalStyled from './styled'
import { Modal } from 'shared'

interface RequestLoginModalProps {
  toggleIsModalOpen: (value: boolean) => void
}

function RequestLoginModal({ toggleIsModalOpen }: RequestLoginModalProps) {
  const handleOverlayClick = () => {
    toggleIsModalOpen(false)
  }

  const handleCancelButtonClick = () => {
    toggleIsModalOpen(false)
  }

  return (
    <Modal onOverlayClick={handleOverlayClick}>
      <RequestLoginModalStyled>
        <div className='request-login-modal d-flex flex-column justify-content-between'>
          <p className='color-white text-center'>Please login to use this function</p>
          <div className='btn-container d-flex justify-content-center'>
            <button className='cancel-btn' onClick={handleCancelButtonClick}>
              <span className='color-primary font-bold'>Cancel</span>
            </button>
          </div>
        </div>
      </RequestLoginModalStyled>
    </Modal>
  )
}

export default RequestLoginModal

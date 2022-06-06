import { MY_HORSE_AVATAR } from 'assets/images'
import HorseModal from 'features/Horse/components/HorseModal'
import { Horse } from 'models'
import { ClassTag } from 'shared'
import MyHorseItemStyled from './styled'

interface MyHorseItemProps {
  horse: Horse
  openHorseModal: boolean
  closeHorseModal: () => void
  handleOpenModalHorse: () => void
  idBeChoose: number
}

function MyHorseITem({ horse, openHorseModal, closeHorseModal, handleOpenModalHorse, idBeChoose }: MyHorseItemProps) {
  return (
    <MyHorseItemStyled onClick={() => handleOpenModalHorse()}>
      <td className='color-white text-center'>
        <img src={MY_HORSE_AVATAR} alt={horse.name} className='horse-avatar' />
      </td>
      <td className='color-white text-center'>{horse.name}</td>
      <td className='color-white text-center'>{horse.blood_line}</td>
      <td className='color-white text-center'>{horse.gender}</td>
      <td className='color-white text-center'>
        <ClassTag text={horse.racing_class} isActive={true} customClass='horse-class position-relative' />
      </td>
      {openHorseModal && <HorseModal horseId={idBeChoose} onCloseButtonClick={closeHorseModal} />}
    </MyHorseItemStyled>
  )
}

export default MyHorseITem

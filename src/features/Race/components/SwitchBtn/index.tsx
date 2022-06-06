import classNames from 'classnames'

import SwitchBtnStyled from './styled'

interface SwitchBtnProps {
  title: string
  isOn: boolean
  handleSwitchBtnClicked: () => void
  customClass?: string
}

function SwitchBtn({ title, isOn, handleSwitchBtnClicked, customClass = '' }: SwitchBtnProps) {
  const switchBtnClass = classNames('switch-btn', {
    'switch-btn--on': isOn
  })
  const SwitchBtnClass = classNames('d-flex', 'align-items-center', customClass)

  return (
    <SwitchBtnStyled className={SwitchBtnClass}>
      <div className='switch-title font-bold color-white'>{title}</div>
      <button className={switchBtnClass} onClick={handleSwitchBtnClicked}>
        <div className='circle' />
      </button>
    </SwitchBtnStyled>
  )
}

export default SwitchBtn

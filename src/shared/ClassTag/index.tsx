import ClassTagStyled from './styled'
import classNames from 'classnames'

interface ClassTagProps {
  isInHomePage?: boolean
  text: string
  onTagClicked?: () => void
  isActive: boolean
  customClass?: string
}

function ClassTag({ text, onTagClicked, isActive, customClass = '', isInHomePage = false }: ClassTagProps) {
  const classTagClass = classNames('position-relative', 'd-inline-block', customClass)

  return (
    <ClassTagStyled
      className={classTagClass}
      isActive={isActive}
      isInHomePage={isInHomePage}
      canBeClicked={Boolean(onTagClicked)}
    >
      <div className='tag text-center position-absolute w-100' onClick={onTagClicked}>
        {text}
      </div>
    </ClassTagStyled>
  )
}

export default ClassTag

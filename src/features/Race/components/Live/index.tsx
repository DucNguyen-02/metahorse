import LiveStyled from "./styled"

function StarIn() {
  return (
    <LiveStyled>
      <div className='starts-in d-flex align-items-center font-bold'>
        <div className='dot' />
        <span className='live font-bold'>Live</span>
      </div>
    </LiveStyled>
  )
}

export default StarIn

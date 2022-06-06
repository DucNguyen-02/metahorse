import CommonLayoutStyled from './styled'
import { Header, Footer } from 'shared'
import { useFocusTopScreen } from 'hooks'

interface CommonLayoutProps {
  children: React.ElementType
}

function CommonLayout({ children }: CommonLayoutProps) {
  useFocusTopScreen()
  
  return (
    <CommonLayoutStyled>
      <div className='header-container position-fixed w-100'>
        <Header />
      </div>
      <div className='content-container'>{children}</div>
      <div className='footer-container'>
        <Footer />
      </div>
    </CommonLayoutStyled>
  )
}

export default CommonLayout

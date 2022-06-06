import { links } from 'apps'
import { COPYRIGHT } from 'assets/images'
import { Link } from 'react-router-dom'
import FooterStyled from './styled'

function Footer() {
  return (
    <FooterStyled>
      <div className='footer d-flex flex-column flex-sm-row align-items-sm-center'>
        <div className='copyright-container d-flex align-items-center'>
          <img src={COPYRIGHT} alt='' className='copyright' />
          <span className='company color-grey'>copyright by [company]</span>
        </div>
        <Link to={links.home.help()} className='service color-white me-3 me-md-4'>
          Help
        </Link>
        <Link to={links.home.terms()} className='service color-white me-3 me-md-4'>
          Terms of service
        </Link>
        <Link to={links.home.privacy()} className='policy color-white'>
          Privacy Policy
        </Link>
      </div>
    </FooterStyled>
  )
}

export default Footer

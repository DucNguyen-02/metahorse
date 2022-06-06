import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { constants, links } from 'apps'
import { COIN_ICON, DEFAULT_HEADER_AVATAR, DROPDOWN_ICON, LOGO, MINI_LOGO } from 'assets/images'
import { logout, setAuthState } from 'features/Auth/auth.slice'
import { logoutProfile, setCurrentUser } from 'features/Profile/profile.slice'
import {
  useAppDispatch,
  useAppSelector,
  useHandleImageError,
  useLocalStorage,
  useOnClickOutside,
  useToggle
} from 'hooks'
import { AuthState } from 'models'
import { handleAsyncRequest } from 'utils/helper'
import { getBalance, getCurrentUser, getSigner } from 'utils/metamask'
import HeaderStyled from './styled'
import useReloadCurrentPage from 'hooks/useReloadCurrentPage'

function Header() {
  const headerMbRef = useRef<HTMLDivElement>(null)
  const burgerBtnRef = useRef<HTMLButtonElement>(null)
  const [isMenuOpened, toggleIsMenuOpened] = useToggle(false)
  const [userId, setUserId] = useLocalStorage(constants.USER_ID_KEY, 0)
  const [, setAccessToken] = useLocalStorage(constants.ACCESS_TOKEN_KEY, '')
  const [, setRefreshToken] = useLocalStorage(constants.REFRESH_TOKEN_KEY, '')
  const handleAvatarError = useHandleImageError(DEFAULT_HEADER_AVATAR)
  const { auth, profile } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  useOnClickOutside(headerMbRef, e => {
    if (e.target == burgerBtnRef.current) {
      return
    }

    toggleIsMenuOpened(false)
  })

  const fetchCurrentUser = useCallback(async () => {
    const [currentUserError, currentUser] = await handleAsyncRequest(getCurrentUser())
    if (currentUserError) {
      console.log(currentUserError)
    }
    if (!currentUser) return

    const [signerError, signer] = await handleAsyncRequest(getSigner())
    if (signerError) {
      console.log(signerError)
    }
    if (!signer) return

    const [balanceError, balance] = await handleAsyncRequest(getBalance(signer))
    if (balanceError) {
      console.log(balanceError)
    }
    if (typeof balance !== 'number') return

    const authState: AuthState = { user_id: userId, isLogged: true, balance }
    dispatch(setAuthState(authState))
    dispatch(setCurrentUser(currentUser))
  }, [])

  useEffect(() => {
    const conditionNotToFetchCurrentUser: boolean =
      (auth.isLogged && userId !== 0) || (!auth.isLogged && userId === 0) || !window.ethereum

    if (conditionNotToFetchCurrentUser) return

    fetchCurrentUser()
  }, [])

  const handleLogoutClick = async () => {
    setUserId(0)
    setAccessToken('')
    setRefreshToken('')
    dispatch(logout())
    dispatch(logoutProfile())
    await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: {} }] })
    await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
    useReloadCurrentPage()
  }

  return (
    <HeaderStyled className='position-relative'>
      <div className='header d-flex justify-content-between align-items-center position-relative'>
        <div className='header-left'>
          <Link to={links.home.index()} className='link-logo d-block'>
            <img src={LOGO} alt='home' className='logo' />
          </Link>
        </div>
        <div className='header-mid d-none d-lg-flex flex-grow-1'>
          <div className='nav font-bold'>
            <Link to={links.race.index()} className='nav-item'>
              <span className='color-white'>race</span>
              <img src={DROPDOWN_ICON} />
            </Link>
            <Link to={links.market.index()} className='nav-item'>
              <span className='color-white'>market place</span>
              <img src={DROPDOWN_ICON} />
            </Link>
            <Link to={links.home.index()} className='nav-item'>
              <span className='color-white'>about this</span>
            </Link>
            <Link to={links.home.index()} className='nav-item'>
              <span className='color-white'>other</span>
              <img src={DROPDOWN_ICON} />
            </Link>
          </div>
        </div>
        <div className='header-right d-none d-lg-block'>
          {auth.user_id ? (
            <div className='login-info d-flex align-items-center'>
              <div className='balance-container d-flex align-items-center'>
                <div className='balance color-white font-bold text-uppercase'>{auth.balance} hth</div>
                <img src={COIN_ICON} alt='' className='coin-icon' />
              </div>
              <div className='separate-line'></div>
              <div className='info-container d-flex align-items-center p-0 position-relative'>
                <div className='name color-white font-bold text-uppercase'>{profile.name}</div>
                <img src={''} alt='' className='avatar rounded-circle' onError={handleAvatarError} />
                <img src={DROPDOWN_ICON} alt='' className='dropdown-icon' />
                <div className='info-dropdown position-absolute'>
                  <div className='info d-flex flex-column align-items-start'>
                    <Link className='info-link color-white' to='/balance'>
                      Balance
                    </Link>
                    <Link className='info-link color-white' to='/profile'>
                      Profile
                    </Link>
                    <button className='info-link logout-btn color-red p-0' onClick={handleLogoutClick}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={links.auth.index()}
              className='login-btn p-0 d-inline-block d-flex align-items-center justify-content-center'
            >
              <span className={`color-primary font-bold`}>Login</span>
              <img src={MINI_LOGO} className='position-absolute' />
            </Link>
          )}
        </div>
        <div className='header-mb-right d-block d-lg-none'>
          <button
            className={`burger-btn ${
              isMenuOpened ? 'burger-btn--open' : ''
            } d-flex flex-column justify-content-between p-0`}
            onClick={() => toggleIsMenuOpened()}
            ref={burgerBtnRef}
          >
            <span className='stick stick-1 d-block' />
            <span className='stick stick-2 d-block' />
            <span className='stick stick-3 d-block' />
          </button>
        </div>
      </div>
      <div
        className={`header-mb ${isMenuOpened ? 'header-mb--open' : ''} d-block d-lg-none position-absolute`}
        ref={headerMbRef}
      >
        <div className='header-mb-container container'>
          <div className='nav font-bold d-flex flex-column '>
            <Link to={links.race.index()} className='nav-item py-3'>
              <span className='color-white'>race</span>
              <img src={DROPDOWN_ICON} />
            </Link>
            <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>market place</span>
              <img src={DROPDOWN_ICON} />
            </Link>
            <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>about this</span>
            </Link>
            <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>other</span>
              <img src={DROPDOWN_ICON} />
            </Link>
          </div>
          <div className='login-container d-flex justify-content-center'>
            {auth.user_id ? (
              <div className='info-nav d-flex flex-column align-items-stretch w-100'>
                <div className='nav-item font-bold py-3 d-flex align-items-center text-uppercase'>
                  <div className='balance-container d-flex align-items-center'>
                    <div className='balance color-white font-bold text-uppercase'>{auth.balance} hth</div>
                    <img src={COIN_ICON} alt='' className='coin-icon' />
                  </div>
                  <div className='info-container d-flex align-items-center p-0 position-relative'>
                    <div className='name color-white font-bold text-uppercase'>{profile.name}</div>
                    <img src={''} alt='' className='avatar rounded-circle' onError={handleAvatarError} />
                  </div>
                </div>
                <Link to='/balance' className='nav-item font-bold color-white py-3 text-uppercase'>
                  Balance
                </Link>
                <Link to={links.profile.index()} className='nav-item font-bold color-white py-3 text-uppercase'>
                  Profile
                </Link>
                <button
                  className='nav-item logout-btn font-bold color-red py-3 text-uppercase p-0 text-start'
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={links.auth.index()} className='login-btn color-primary font-bold my-3 w-100 text-center'>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </HeaderStyled>
  )
}

export default Header

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import authApi from 'apis/authApi'
import { constants, links } from 'apps'
import { METAMASK_LOGIN_BTN } from 'assets/images'
import { setAuthState } from 'features/Auth/auth.slice'
import { setCurrentUser } from 'features/Profile/profile.slice'
import { useAppDispatch, useAppSelector, useLocalStorage } from 'hooks'
import { AuthState } from 'models'
import { TwoLineTitle } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import {
  getBalance,
  getCurrentUser,
  getPostLoginBody,
  getRandomMessage,
  getSigner,
  isEthereumWalletInstalled,
  isRequestAccountsError
} from 'utils/metamask'
import AuthStyled from './styled'
import classNames from 'classnames'

function Auth() {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useLocalStorage(constants.ACCESS_TOKEN_KEY, '')
  const [, setRefreshToken] = useLocalStorage(constants.REFRESH_TOKEN_KEY, '')
  const [, setStorageUserId] = useLocalStorage(constants.USER_ID_KEY, 0)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  const metaMaskButtonClass = classNames('login-btn', 'p-0', { ['login-btn--loading']: isLoading })

  useEffect(() => {
    if (accessToken) {
      navigate(links.home.index())
    }
  }, [auth])

  const handleMetamaskLoginClicked = async () => {
    if (isLoading) return

    setIsLoading(true)

    if (!isEthereumWalletInstalled()) throw new Error('No crypto wallet found. Please install it.')

    const [, randomMessage] = await handleAsyncRequest(getRandomMessage())
    if (!randomMessage) return

    const [signerError, signer] = await handleAsyncRequest(getSigner())
    if (signerError && isRequestAccountsError(signerError)) {
      setErrorMessage(signerError.message)

      return
    }
    if (!signer) return

    const [, postLoginBody] = await handleAsyncRequest(getPostLoginBody(signer, randomMessage))
    if (!postLoginBody) return

    const [, loginResponse] = await handleAsyncRequest(authApi.postLogin(postLoginBody))
    if (!loginResponse) return

    const {
      data: { access_token, refresh_token, user_id }
    } = loginResponse

    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    setStorageUserId(user_id)

    const [, currentUser] = await handleAsyncRequest(getCurrentUser())
    if (!currentUser) return

    const [, balance] = await handleAsyncRequest(getBalance(signer))
    if (typeof balance !== 'number') return

    const authState: AuthState = { user_id, isLogged: true, balance }

    dispatch(setAuthState(authState))
    dispatch(setCurrentUser(currentUser))

    setIsLoading(false)
  }

  return (
    <AuthStyled>
      <div className='login'>
        <div className='container'>
          <div className='title-container d-flex flex-column align-items-center'>
            <TwoLineTitle text='join now' customClass='title' />
            <div className='sub-title color-white'>Start your career and mark your name on the field</div>
          </div>
          <div className='login-container'>
            <div className='login-wrapper d-flex flex-column flex-md-row justify-content-center align-items-center'>
              <button className={metaMaskButtonClass} onClick={handleMetamaskLoginClicked} disabled={isLoading}>
                <img src={METAMASK_LOGIN_BTN} alt='' className='login-img' />
              </button>
            </div>
          </div>
          <div className='err-container color-white text-center'>{errorMessage}</div>
        </div>
      </div>
    </AuthStyled>
  )
}

export default Auth

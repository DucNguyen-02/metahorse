import userApi from 'apis/userApi'
import { AVATAR_BG, CAMERA_ICON, ONE_LINE_YELLOW, SETTING_ICON, SHARE_ICON, UPLOAD_BG_BTN } from 'assets/images'
import { MyHorseItem } from 'features/Profile/components'
import { useAppSelector, useDebounce, useHandleImageError } from 'hooks'
import { Horse, MyHorseListParams } from 'models'
import { ChangeEvent, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactLoading from 'react-loading'
import { OneLineTitle, SearchInput } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import ProfileStyled from './styled'

const myHorseListParams: MyHorseListParams = {
  limit: 10,
  page: 1
}

function Profile() {
  const [params, setParams] = useState<MyHorseListParams>(myHorseListParams)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearchValue = useDebounce<string>(searchValue, 500)
  const handleBgError = useHandleImageError(AVATAR_BG)
  const handleAvatarError = useHandleImageError('https://picsum.photos/200')
  const profile = useAppSelector(state => state.profile)
  const [isOpenHorseModal, setOpenHorseModal] = useState(false)
  const [idBeChoose, setIdBeChoose] = useState<number>(0)
  const [loader, setLoader] = useState(true)
  const [listHorse, setListHorse] = useState<Horse[]>([])

  const fetchListRaces = async () => {
    const [, result] = await handleAsyncRequest(userApi.getUserHorseList(params))
    const records = result?.data.records
    if (records && records.length > 0) {
      setListHorse([...listHorse, ...records])
      setLoader(false)
    }

    if (records && records.length === 0) {
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchListRaces()
  }, [params])

  useEffect(() => {
    if (debounceSearchValue === '') {
      return
    }

    console.log(debounceSearchValue)
  }, [debounceSearchValue])

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleOpenModalHorse = (id: number) => {
    setIdBeChoose(id)
    setOpenHorseModal(true)
  }

  const closeHorseModal = () => {
    setOpenHorseModal(false)
  }

  return (
    <ProfileStyled>
      <div className='profile'>
        <div className='container'>
          <div className='profile-section'>
            <div className='bg-container position-relative'>
              <img src={''} alt='' className='bg w-100' onError={handleBgError} />
              <div className='bg-btn position-absolute'>
                <label htmlFor='background' className='bg-label' role='button'>
                  <img src={UPLOAD_BG_BTN} alt='' />
                </label>
                <input type='file' id='background' className='d-none' accept='image/*' />
              </div>
            </div>
            <div className='profile-container'>
              <div className='top-container d-flex align-items-center'>
                <div className='avatar-container position-relative'>
                  <div className='avatar-wrapper position-absolute rounded-circle d-flex align-items-center justify-content-center w-100'>
                    <div className='avatar-box position-relative overflow-hidden rounded-circle'>
                      <img src={profile.avatar ?? ''} alt='' className='avatar' onError={handleAvatarError} />
                      <label
                        htmlFor='avatar'
                        className='avatar-overlay position-absolute flex-column align-items-center justify-content-center w-100 h-50'
                        role='button'
                      >
                        <img src={CAMERA_ICON} alt='' />
                        <span className='overlay-text color-white'>Change image</span>
                      </label>
                      <input id='avatar' type='file' accept='image/*' className='d-none' />
                    </div>
                  </div>
                </div>
                <div className='info-container d-flex flex-column'>
                  <div className='name-container color-white font-bold text-uppercase'>{profile.name}</div>
                  <div className='action-container color-white d-flex align-items-center'>
                    <div className='action-item d-flex align-items-center'>
                      <img src={SHARE_ICON} alt='' />
                      <span>Share</span>
                    </div>
                    <div className='action-item d-flex align-items-center'>
                      <img src={SETTING_ICON} alt='' />
                      <span>Setting</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bottom-container d-flex'>
                <div className='stat-item'>
                  <div className='stat-title'>
                    <div className='title color-grey'>Horse num</div>
                    <img src={ONE_LINE_YELLOW} alt='' className='d-block' />
                  </div>
                  <div className='stat-content color-white font-bold'>replace me</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-title'>
                    <div className='title color-grey'>Total statistic</div>
                    <img src={ONE_LINE_YELLOW} alt='' className='d-block' />
                  </div>
                  <div className='stat-content color-white font-bold'>{profile.total_race}</div>
                </div>
                <div className='stat-item'>
                  <div className='stat-title'>
                    <div className='title color-grey'>Win rate</div>
                    <img src={ONE_LINE_YELLOW} alt='' className='d-block' />
                  </div>
                  <div className='stat-content color-white font-bold'>{profile.win_rate}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='my-horse-section'>
            <OneLineTitle text='my horses' customClass='title' />
            <div className='search-container'>
              <SearchInput
                searchValue={searchValue}
                handleSearchValueChanged={handleSearchValueChanged}
                customClass='search-horse-input'
              />
            </div>
            <div className='my-horse-container'>
              <InfiniteScroll
                dataLength={listHorse.length}
                next={() => setParams({ ...params, page: params.page + 1 })}
                hasMore={true}
                loader={loader === false ? <ReactLoading className='loading' type={'spin'} /> : ''}
              >
                <table className='my-horse-table w-100'>
                  <tbody>
                    {listHorse.map(horse => (
                      <MyHorseItem
                        key={horse.id}
                        horse={horse}
                        openHorseModal={isOpenHorseModal}
                        closeHorseModal={() => closeHorseModal()}
                        handleOpenModalHorse={() => handleOpenModalHorse(horse.id)}
                        idBeChoose={idBeChoose}
                      />
                    ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </ProfileStyled>
  )
}

export default Profile

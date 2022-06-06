export default {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_ID_KEY: 'user_id',
  HEROKU_BY_PASS: 'https://heroku-bypass.herokuapp.com/',
  DEBOUNCE_TIME: 500,
  HTTP_STATUS: {
    BAD_REQUEST: 400
  }
}

export enum STATUS {
  WAITING = 'WAITING',
  SCHEDULING = 'SCHEDULING',
  LIVE = 'LIVE'
}

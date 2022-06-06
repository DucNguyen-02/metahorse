export default {
  default: () => '/',
  home: {
    feature: () => '*',
    help: () => '/help',
    terms: () => '/terms',
    privacy: () => '/privacy'
  },
  race: {
    feature: () => 'race/*',
    scheduledRaces: () => '/scheduled-races',
    open: () => '/open',
    detail: () => '/detail/:raceId',
    result: () => '/result'
  },
  auth: {
    feature: () => 'login/*'
  },
  horse: {
    feature: () => 'horse/*',
    detail: () => '/detail/:horseId'
  },
  profile: {
    feature: () => 'profile/*'
  },
  market: {
    feature: () => 'market/*'
  }
}

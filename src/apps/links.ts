export default {
  home: {
    index: () => '/',
    help: () => '/help',
    terms: () => '/terms',
    privacy: () => '/privacy'
  },
  race: {
    index: () => '/race',
    scheduledRaces: () => '/race/scheduled-races',
    open: () => '/race/open',
    detail: (raceId: number | undefined) => `/race/detail/${raceId}`,
    result: () => '/race/result'
  },
  auth: {
    index: () => '/login'
  },
  horse: {
    index: () => '/horse',
    detail: (horseId: number) => `/horse/detail/${horseId}`
  },
  profile: {
    index: () => '/profile'
  },
  market: {
    index: () => '/market'
  }
}

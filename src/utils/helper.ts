/* eslint-disable @typescript-eslint/no-explicit-any */
export function ordinalSuffixOf(number: number): string {
  const j = number % 10
  const k = number % 100

  if (j == 1 && k != 11) {
    return number + 'st'
  }

  if (j == 2 && k != 12) {
    return number + 'nd'
  }

  if (j == 3 && k != 13) {
    return number + 'rd'
  }

  return number + 'th'
}

export function getBearerToken(token: string) {
  return token ? `Bearer ${token}` : ''
}

export function isObjectEmptyArray(candidate: any): candidate is [] {
  if (!Array.isArray(candidate)) return false
  if (candidate.length > 0) return false
  return true
}

export async function handleAsyncRequest<D>(promise: Promise<D>): Promise<[unknown, D?]> {
  try {
    const data: D = await promise
    return [undefined, data]
  } catch (error) {
    return [error, undefined]
  }
}

export function capitalizeOnlyFirstLetter(text: string | undefined) {
  if (!text) {
    return ''
  }

  const firstLetter = text[0].toUpperCase()
  const theRestText = text.slice(1).toLowerCase()

  return firstLetter + theRestText
}

export function getCurrentEnergyPercent(currentEnergy: number | null, maxEnergy: number | null) {
  currentEnergy = currentEnergy || 0
  maxEnergy = maxEnergy || 100

  return Math.round((100 * currentEnergy) / maxEnergy)
}

export function shortenUserName(name?: string) {
  if (!name) {
    return ''
  }

  let newName = name

  if (newName.startsWith('0x')) {
    newName = `${newName.slice(0, 6)}...${newName.slice(-4)}`
  }

  return newName
}

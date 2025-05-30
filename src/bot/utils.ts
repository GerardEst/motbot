export function getDaysRemainingInMonth() {
  const avui = new Date()
  const ultimDiaMes = new Date(
    avui.getFullYear(),
    avui.getMonth() + 1,
    0
  ).getDate()
  const diesRestants = ultimDiaMes - avui.getDate()

  return diesRestants
}

export function getCurrentMonth(): number {
  const now = new Date()
  return now.getMonth() + 1
}

export function isSummerTime() {
  const now = new Date()
  // Get the timezone offset for Spain at the current time
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Madrid',
    timeZoneName: 'longOffset',
  })
  const parts = formatter.formatToParts(now)
  const offset = parts.find((part) => part.type === 'timeZoneName')?.value

  // Summer time: GMT+02:00, Winter time: GMT+01:00
  return offset === 'GMT+02:00'
}

export function getSpainDateFromUTC(date: string) {
  // Convert UTC date to Spain date
  const utcDate = new Date(date)
  const hoursToAdd = isSummerTime() ? 2 : 1
  return new Date(utcDate.getTime() + hoursToAdd * 60 * 60 * 1000)
}

export function getPoints(message: string) {
  const tries = message.split(' ')[2].split('/')[0]

  if (tries === 'X') return 0

  const points = 6 - parseInt(tries)

  return points + 1
}

export function getPointsForHability(hability: number) {
  // Normalized hability between 0 and 1
  const normalizedHability = Math.min(Math.max(hability, 0), 10) / 10

  // Generate a random number between 0 and 1
  const rand = Math.random()

  if (rand < 0.2) {
    return 0
  } else if (rand < 0.8) {
    return 1
  } else {
    return 2
  }
}

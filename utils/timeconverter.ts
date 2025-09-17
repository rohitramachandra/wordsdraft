export function timeAgo(dateString: string): string {
  const now = new Date()
  const past = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const seconds = diffInSeconds
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30.44) // Average days in a month
  const years = Math.floor(days / 365)

  if (seconds < 60) {
    return 'Just now'
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else {
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
}

import { guardNonOnboarded } from '@/lib/guards'
import HomePage from './HomeComponent'

export default async function Home() {
  await guardNonOnboarded()
  return <HomePage />
}

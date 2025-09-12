import OnboardingPage from './OnboardingComponent'
import { guardOnboarded } from '@/lib/guards'

export default async function Onboarding() {
  await guardOnboarded()
  return <OnboardingPage />
}

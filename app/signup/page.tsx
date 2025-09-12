import SignupPage from './SignUpComponent'
import { guardLoggedIn } from '@/lib/guards'

export default async function SignUp() {
  await guardLoggedIn()
  return <SignupPage />
}

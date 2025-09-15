import LoginPage from './LoginComponent'
import { guardLoggedIn } from '@/lib/guards'

export default async function Login() {
  await guardLoggedIn()
  return <LoginPage />
}

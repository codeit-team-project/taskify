import SignLayout from '@/components/ui/layout/SignLayout'
import SignupForm from '@/components/signForm/SignupForm'

export default function SignUpPage() {
  return (
    <SignLayout isSignin={false}>
      <SignupForm />
    </SignLayout>
  )
}

import HomeLayout from '@/components/ui/layout/HomeLayout'

export default function Home() {
  const hi = 'test'
  return (
    <HomeLayout>
      <div style={{ fontSize: '5rem' }}>{hi}</div>
    </HomeLayout>
  )
}

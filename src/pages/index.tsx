import { getMembers } from '@/api/members'
import Modal from '@/components/modal/Modal'
import { useQuery } from '@tanstack/react-query'
export default function Home() {
  //  dashboard id가 27번에 속하는 사람들의 리스트를 볼 수있다
  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ['getMembers'],
    queryFn: () => getMembers(27),
  })

  console.log(data)

  return (
    <div>
      <Modal />
    </div>
  )
}

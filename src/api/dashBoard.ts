export async function createDashBoard() {
  const res = await fetch('https://sp-taskify-api.vercel.app/1-02/dashboards', {
    method: 'POST',
    body: JSON.stringify({
      title: '개발일지',
      color: '#E876EA',
    }),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  console.log(data)

  return data
}

interface QueryProps {
  page?: number
  size?: number
  id: number
}

export async function getDashBoardMembers({ page, size, id }: QueryProps) {
  const QUERY_PAGE = page ? `page=${page}&` : ''
  const QUERY_SIZE = size ? `size=${size}&` : ''

  const res = await fetch(
    `https://sp-taskify-api.vercel.app/1-02/members?${QUERY_PAGE}${QUERY_SIZE}dashboardId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  )
  const data = await res.json()
  return data
}

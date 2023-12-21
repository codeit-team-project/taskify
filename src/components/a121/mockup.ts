import MemberType from '@/types/MemberType'

// 로그인 시 받는 response,
export const mockupUser = {
  user: {
    id: 1,
    email: 'myemail@codeit.com',
    nickname: '김코딩',
    profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
    createdAt: '2023-12-19T11:15:26.418Z',
    updatedAt: '2023-12-19T11:15:26.418Z',
  },
  accessToken: 'string1',
}

// 유저의 대시보드들 목록 조회 성공 시 받는 response
export const mockDashboardList = {
  cursorId: 0,
  totalCount: 0,
  dashboards: [
    {
      id: 12,
      title: '2팀 플젝 대시보드',
      color: '--color-blue',
      createdAt: '2023-12-19T11:19:46.996Z',
      updatedAt: '2023-12-19T11:19:46.996Z',
      createdByMe: true,
      userId: 1,
    },
    {
      id: 32,
      title: '테스트 준비 대시보드',
      color: '--color-red',
      createdAt: '2023-12-19T11:19:46.996Z',
      updatedAt: '2023-12-19T11:19:46.996Z',
      createdByMe: true,
      userId: 1,
    },
    {
      id: 17,
      title: '회사 부서 대시보드',
      color: '--color-violet',
      createdAt: '2023-12-19T11:19:46.996Z',
      updatedAt: '2023-12-19T11:19:46.996Z',
      createdByMe: false,
      userId: 31,
    },
  ],
}

// 각 대시보드 상세 조회 성공 시 받는 response
export const mockDashboardInfo = {
  id: 12,
  title: '2팀 플젝 대시보드',
  color: '--color-blue',
  createdAt: '2023-12-19T11:21:39.054Z',
  updatedAt: '2023-12-19T11:21:39.054Z',
  createdByMe: true,
  userId: 1,
}

// 각 대시보드의 멤버들 목록 조회 성공 시 받는 response (인원수 3명)
export const mockDashboardMemberSmallList: {
  members: MemberType[]
  totalCount: number
} = {
  members: [
    {
      id: 1,
      userId: 1,
      email: 'myemail@codeit.com',
      nickname: '김코딩',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: true,
    },
    {
      id: 2,
      userId: 52,
      email: 'test52@codeit.com',
      nickname: 'test52유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 4,
      userId: 17,
      email: 'test17@codeit.com',
      nickname: 'test17유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
  ],
  totalCount: 3,
}

// 각 대시보드의 멤버들 목록 조회 성공 시 받는 response (인원수 8명)
export const mockDashboardMemberManyList = {
  members: [
    {
      id: 1,
      userId: 1,
      email: 'myemail@codeit.com',
      nickname: '김코딩',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: true,
    },
    {
      id: 2,
      userId: 52,
      email: 'test52@codeit.com',
      nickname: 'test52유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 4,
      userId: 17,
      email: 'test17@codeit.com',
      nickname: 'test17유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 5,
      userId: 18,
      email: 'test5@codeit.com',
      nickname: 'test5유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 9,
      userId: 178,
      email: 'test178@codeit.com',
      nickname: 'test178유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 10,
      userId: 341,
      email: 'test341@codeit.com',
      nickname: 'test341유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 11,
      userId: 66,
      email: 'test66@codeit.com',
      nickname: 'test66유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
    {
      id: 12,
      userId: 87,
      email: 'test87@codeit.com',
      nickname: 'test87유저',
      profileImageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      createdAt: '2023-12-19T11:23:26.920Z',
      updatedAt: '2023-12-19T11:23:26.920Z',
      isOwner: false,
    },
  ],
  totalCount: 8,
}

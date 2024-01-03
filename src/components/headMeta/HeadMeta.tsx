import Head from 'next/head'

interface HeadMetaProps {
  title?: string
}

export default function HeadMeta({ title }: HeadMetaProps) {
  return (
    <Head>
      <title>{`${title || '새로운 일정관리 ⚡️'}| Taskify`}</title>
      <meta
        name="description"
        content="대시보드 설정, 팀원 초대, 할일 생성 등 다양한 기능으로 개발자 일정을 관리하세요"
      />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* 배포 후 재설정 - Open Graph */}
      <meta property="og:title" content="새로운 일정관리 ⚡️ | Taskify" key="title" />
      <meta property="og:description" content="개발자 일정관리 웹 어플리케이션" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

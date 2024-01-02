import Head from 'next/head'

interface HeadMetaProps {
  title: string
}

export default function HeadMeta({ title }: HeadMetaProps) {
  return (
    <Head>
      <title>{title ? title : '새로운 일정관리 ⚡️'} | Taskify</title>
      <meta name="description" content="개발자 일정관리 웹 어플리케이션" />
    </Head>
  )
}

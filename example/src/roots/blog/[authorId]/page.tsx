import { AuthorPage } from '~/ui/components/pages/AuthorPage'

export default function AuthorDetail({ params }: any) {
  return <AuthorPage id={params.authorId} />
}

export async function generateStaticParams(props: any) {
  return ['1', '2'].map((id) => ({ authorId: id }))
}

import { AuthorPage } from '~/ui/components/pages/AuthorPage'

export default function AuthorDetail({ params, pageHref }: any) {
  return <AuthorPage id={pageHref} />
}

export async function generateStaticParams(props: any) {
  return ['1', '2'].map((id) => ({ authorId: id }))
}

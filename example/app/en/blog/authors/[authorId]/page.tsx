import { AuthorPage } from '~/ui/components/pages/AuthorPage'

export default function AuthorDetail({ params }: any) {
  return <AuthorPage data={{ author: params.id }} />
}

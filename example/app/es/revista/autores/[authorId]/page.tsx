import { Author } from '~/components/Author/Author'

export default function AuthorDetail({ params }: any) {
  return <Author data={{ author: params.id }} />
}

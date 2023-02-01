import { Article } from '~/components/Article/Article'

export default function ArticleDetail({ params }: any) {
  return <Article data={{ author: params.id, article: params.id }} />
}

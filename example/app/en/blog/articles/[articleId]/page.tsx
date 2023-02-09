import { ArticlePage } from '~/ui/components/pages/ArticlePage'

export default function ArticleDetail({ params }: any) {
  return <ArticlePage data={{ author: params.id, article: params.id }} />
}

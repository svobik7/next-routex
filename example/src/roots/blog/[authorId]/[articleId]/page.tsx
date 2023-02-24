import { ArticlePage } from '~/ui/components/pages/ArticlePage'

export default function ArticleDetail({ params, route, locale }: any) {
  return (
    <div>
      <div>{JSON.stringify({ route, locale })}</div>
      <ArticlePage id={params.articleId} />
    </div>
  )
}

export async function generateStaticParams(props: any) {
  return ['A', 'B'].map((id) => ({ articleId: `${props.locale}:${id}` }))
}

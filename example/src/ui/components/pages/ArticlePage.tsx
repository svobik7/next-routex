type ArticlePageProps = {
  id: string
}

export function ArticlePage(props: ArticlePageProps) {
  const { id } = props

  return (
    <div className="">
      Article ID: <strong>{id}</strong>
    </div>
  )
}

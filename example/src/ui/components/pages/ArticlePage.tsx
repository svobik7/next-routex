type ArticlePageProps = {
  data: {
    author: unknown
    article: unknown
  }
}

export function ArticlePage(props: ArticlePageProps) {
  const {
    data: { author, article },
  } = props

  return (
    <div className="">
      Article
      <br />
      <br />
      {JSON.stringify({
        author,
        article,
      })}
    </div>
  )
}

type ArticleProps = {
  data: {
    author: unknown
    article: unknown
  }
}

export function Article(props: ArticleProps) {
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

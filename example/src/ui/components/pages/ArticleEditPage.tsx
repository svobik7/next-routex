type ArticleEditPageProps = {
  id: string
}

export function ArticleEditPage(props: ArticleEditPageProps) {
  const { id } = props

  return (
    <div className="">
      Edit Article ID: <strong>{id}</strong>
    </div>
  )
}

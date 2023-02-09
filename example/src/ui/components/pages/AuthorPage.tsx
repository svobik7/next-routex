type AuthorPageProps = {
  data: {
    author: unknown
  }
}

export function AuthorPage(props: AuthorPageProps) {
  const {
    data: { author },
  } = props

  return (
    <div className="">
      Author
      <br />
      <br />
      {JSON.stringify({
        author,
      })}
    </div>
  )
}

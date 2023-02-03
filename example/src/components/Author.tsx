type DetailAuthorProps = {
  data: {
    author: unknown
  }
}

export function Author(props: DetailAuthorProps) {
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

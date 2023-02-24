type AuthorPageProps = {
  id: string
}

export function AuthorPage(props: AuthorPageProps) {
  const { id } = props

  return (
    <div className="">
      Author ID: <strong>{id}</strong>
    </div>
  )
}

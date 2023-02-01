export interface Author {
  id: number
  name: string
  username: string
}

export interface Article {
  id: number
  title: string
  slug: string
  authorId: string
}

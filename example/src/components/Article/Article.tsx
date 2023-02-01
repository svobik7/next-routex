import dynamic from 'next/dynamic'
import styles from './Article.module.css'

const NotFound = dynamic(() => import('../NotFound/NotFound'))

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
    <div className={styles.root}>
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

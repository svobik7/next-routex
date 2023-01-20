import { isArticle, isAuthor } from '~/models'
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

  // show 404 when article either author is not found
  if (!isFound(props.data)) {
    return <NotFound />
  }

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

/**
 * Determines if props.data is valid to show or not
 * @param data
 */
function isFound(data: ArticleProps['data']) {
  return isAuthor(data.author) && isArticle(data.article)
}

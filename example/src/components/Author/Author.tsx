import { isAuthor } from '~/models'
import dynamic from 'next/dynamic'
import styles from './Author.module.css'

const NotFound = dynamic(() => import('../NotFound/NotFound'))

type DetailAuthorProps = {
  data: {
    author: unknown
  }
}

export function Author(props: DetailAuthorProps) {
  const {
    data: { author },
  } = props

  // show 404 when author is not found
  if (!isFound(props.data)) {
    return <NotFound />
  }

  return (
    <div className={styles.root}>
      Author
      <br />
      <br />
      {JSON.stringify({
        author,
      })}
    </div>
  )
}

/**
 * Determines if props.data is valid to show or not
 * @param data
 */
function isFound(data: DetailAuthorProps['data']) {
  return isAuthor(data.author)
}

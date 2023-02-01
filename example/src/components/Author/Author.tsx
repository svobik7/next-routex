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

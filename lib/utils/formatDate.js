import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = format(new Date(date), 'yyyy/M/d', { locale: ja })

  return now
}

export default formatDate

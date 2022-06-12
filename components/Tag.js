import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="darkx:hover:text-primary-400 mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag

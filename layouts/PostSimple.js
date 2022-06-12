import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import ScrollTop from '@/components/ScrollTop'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="darkx:border-gray-700 space-y-1 border-b border-gray-200 pb-10 text-center">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="darkx:text-gray-400 text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="darkx:divide-gray-700 divide-y divide-gray-200 pb-8 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="darkx:divide-gray-700 divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="darkx:prose-dark prose max-w-none pt-10 pb-8">{children}</div>
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="darkx:hover:text-primary-400 text-primary-500 hover:text-primary-600"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="darkx:hover:text-primary-400 text-primary-500 hover:text-primary-600"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

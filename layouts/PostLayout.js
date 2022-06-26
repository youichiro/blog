import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTop from '@/components/ScrollTop'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTop />
      <article>
        <div className="xl:darkx:divide-gray-700 divide-y divide-gray-200">
          <header className="pb-3">
            <div className="space-y-1">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="darkx:text-gray-400 text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>
                      {format(new Date(date), 'yyyy/M/d', { locale: ja })}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="darkx:divide-gray-700 divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="darkx:divide-gray-700 divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="darkx:prose-dark prose max-w-none break-all pt-10 pb-8">
                {children}
              </div>
            </div>
            <footer>
              <div className="darkx:divide-gray-700 divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="darkx:text-gray-400 text-xs uppercase tracking-wide text-gray-500">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="darkx:text-gray-400 text-xs uppercase tracking-wide text-gray-500">
                          Previous Article
                        </h2>
                        <div className="darkx:hover:text-primary-400 text-primary-500 hover:text-primary-600">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="darkx:text-gray-400 text-xs uppercase tracking-wide text-gray-500">
                          Next Article
                        </h2>
                        <div className="darkx:hover:text-primary-400 text-primary-500 hover:text-primary-600">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="darkx:hover:text-primary-400 text-primary-500 hover:text-primary-600"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

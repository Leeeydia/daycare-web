import { Helmet } from 'react-helmet-async'
import { site } from '@/config/site'

type Props = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

/** 페이지별 title/description/OG 태그 */
export function Seo({ title, description, path = '', image, noIndex }: Props) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.slogan}`
  const desc = description ?? site.description
  const url = `${site.domain}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={`${site.domain}${image}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}

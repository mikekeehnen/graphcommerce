import { GQLRowHeroVideoFragment } from '../../generated/graphql'
import { LinkInternal } from '../LinkInternal/LinkInternal'
import { LinkExternal } from '../LinkExternal/LinkExternal'
import styles from './RowHeroVideo.module.css'

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHeroVideo: React.FC<GQLRowHeroVideoFragment> = ({ content, video, links }) => {
  return (
    <div className={styles.row}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: content.html }} />

      {video && (
        <video autoPlay loop muted playsinline id='video'>
          <source src={video.url} type={video.mimeType!} />
        </video>
      )}

      <div>
        {links.map(link => {
          switch (link.__typename) {
            case 'LinkInternal':
              return <LinkInternal {...link} key={link.id} />
            case 'LinkExternal':
              return <LinkExternal {...link} key={link.id} />
            default:
              return <></>
          }
        })}
      </div>
    </div>
  )
}

export default RowHeroVideo
import React from 'react';
import Helmet from 'react-helmet';
import Responsive from 'react-responsive'

import { Grid, Row, Col } from '../components/Grid'
import MobileGallery from '../components/Gallery/Mobile'
import DesktopGallery from '../components/Gallery/Desktop'

export default function Template({ data, transition }) {
  const { markdownRemark: artist } = data;
  const {
    frontmatter: {
      portfolios = [],
      portrait,
      instagram_handle,
      type,
      title,
      cover,
      enquire,
      videos
    }
  } = artist
  const { html: biography } = artist
  const { instagram = {} } = data
  const insta = instagram ? instagram.images : []
  const followers = data.followers && data.followers.followers

  return (
    <section
      //style={transition && transition.style}
    >
      <Helmet title={`${title}`} />
      <Responsive maxWidth={`48em`}>
        <MobileGallery
          title={title}
          cover={cover}
          portfolios={portfolios || []}
          videos={videos}
          instagram={insta}
          biography={biography}
          portrait={portrait}
        />
      </Responsive>
      <Responsive minWidth={`48em`}>
        <div>
          <DesktopGallery
            transition={transition}
            title={title}
            cover={cover}
            type={type}
            portfolios={portfolios || []}
            videos={videos}
            instagram={insta}
            followers={followers}
            biography={biography}
            portrait={portrait}
            instagram_handle={instagram_handle}
            enquire={enquire}
          />
        </div>
      </Responsive>
    </section>
  );
}


export const gatsbyImageSharpSizes = graphql`
  fragment GatsbyImageSharpSizes on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`

export const pageQuery = graphql`
  query ArtistByPath($slug: String!, $instagram_handle: String!) {
    followers: instagramPhoto(username: {eq: $instagram_handle}) {
      followers
    }
    instagram: instagramPhoto(username: {eq: $instagram_handle}) {
      images {
        media
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        instagram_handle
        enquire
        cover {
          childImageSharp {
            sizes(maxWidth: 2600, quality: 60) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        videos {
          title
          poster
          url
          ratio
        }
        portfolios {
          title
          columns
          gallery {
            image {
              childImageSharp {
                sizes(maxWidth: 1600, quality: 60) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;

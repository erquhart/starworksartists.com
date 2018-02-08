import React from 'react';
import Helmet from 'react-helmet';
import Responsive from 'react-responsive'

import { Grid, Row, Col } from '../components/Grid'
import MobileGallery from '../components/Gallery/Mobile'
import DesktopGallery from '../components/Gallery/Desktop'

export default function Template({ data }) {
  // console.log(`Artist template data`, data)
  const { markdownRemark: artist } = data;
  const { frontmatter: { portfolios = [], videos = [], image } } = artist
  const { html: biography } = artist
  const { instagram: { edges: insta = [] } } = data

  return (
    <section>
      <Helmet title={`${artist.frontmatter.title}`} />
      <Responsive maxWidth={`48em`}>
        <MobileGallery
          title={artist.frontmatter.title}
          portfolios={portfolios}
          videos={videos}
          instagram={insta}
          biography={biography}
          image={image}
        />
      </Responsive>
      <Responsive minWidth={`48em`}>
        <div>
          <DesktopGallery
            title={artist.frontmatter.title}
            portfolios={portfolios}
            videos={videos}
            instagram={insta}
            biography={biography}
            image={image}
          />
        </div>
      </Responsive>
    </section>
  );
}

export const pageQuery = graphql`
  query ArtistByPath($path: String!, $instagram_handle: String!) {
    instagram: allInstagramPhoto(filter: {username: {eq: $instagram_handle}}) {
      edges {
        node {
          id
          time
          media
          text
          username
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        type
        order
        portfolios {
          title
          gallery {
            image {
              childImageSharp {
                sizes(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
        videos {
          title
          url
        }
        image {
          childImageSharp {
            resolutions(width: 400) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }
  }
`;

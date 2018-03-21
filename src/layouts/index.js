import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import slug from 'slug'
import { Baseline } from '../components/Layout'

//import Scroll from '../components/Scroll'



import './index.css'

import { window } from 'global'

const handleClickAdmin = () => {
  if(typeof window !== 'undefined') {
    if (window.netlifyIdentity) {
      if (window.netlifyIdentity.currentUser()) {
        document.location.href = "/admin/"
      } else {
        window.netlifyIdentity.open()
      }
    }
  }
}


// Testing if Retina screen has better performance with less calls from the scroll event
// if it is too slow it misses 'waypoints', 1000/15 is way to infrequent
// so is 1000/20.
/*
import canUseDom from '../utils/canUseDom'

console.log('canUseDom: ', canUseDom)

if (canUseDom) {
  window.requestAnimationFrame = function (callback) { return window.setTimeout(callback, 1000 / 20) }
}

*/
const TemplateWrapper = ({
  children,
  data: {
    site: {
      siteMetadata
    }
  },
  ...props
}) => (
  <div>
    <Helmet
      title={siteMetadata.title}
      meta={[
        { name: 'description', content: siteMetadata.meta.description },
        { name: 'keywords', content: siteMetadata.meta.keywords },
      ]}
    />
   {/*<a
      onClick={handleClickAdmin}
      href="#"
    >
      Admin
    </a>*/}
    <div css={{display: 'relative'}}>
      {/*
        pages.edges && pages.edges.map(
          ({ node: { frontmatter }}) => {
            return <div key={ frontmatter.path } style={{display: 'block'}}><a href={frontmatter.path}>{frontmatter.title}</a></div>
          }
        )
      */}
      {children()}
      <Baseline />
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


export const siteMetadataFragment = graphql`
  fragment siteMetadata on RootQueryType {
    site {
      siteMetadata {
        title
        meta {
          description
          keywords
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query LayoutQuery {
    ...siteMetadata
  }
`;


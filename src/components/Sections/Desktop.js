import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import Img from '../Image'
import Video from '../Video'

import Responsive from 'react-responsive'

import { Paragraph, HeaderXS, HeaderSM, HeaderMD, HeaderLG } from '../Styled'



import { Grid, Row, Col } from '../Grid'

import Gallery from '../Gallery'

const renderImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        //float: 'left',
        display: 'inline-block',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}

const renderInstagramImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        //float: 'left',
        display: 'inline-block',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img
        sizes={originalSizes}
        objectPosition={'center center'}
        objectFit={'cover'}
      />
    </div>
  )
}

export class Portfolios extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.portfolios.length !== nextProps.portfolios.length) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      portfolios,
      sections,
      returnRef,
      onPositionChange,
      openLightbox,
      //onClose,
      //onClickPrev,
      //onClickNext,
      //currentImage,
      //isOpen,
    } = this.props
    //console.log("Portfolios render method called!")

    const images = []

    return (
      <div>
        {
          portfolios && portfolios.map((portfolio, index) => {
            const refKey = sections[index].key
            const photos = []
            return (
              <Waypoint
                onPositionChange={(props) => onPositionChange(props, refKey) }
                key={index}
                ref={ (ref) => returnRef(ref, refKey) }
                topOffset={-50}
                botttomOffset={-50}
              >
                <div
                  css={{
                    paddingTop: '5rem',
                    marginBottom: '10rem',
                    textAlign: 'center'
                  }}
                >
                {
                  portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                    if (image && image.childImageSharp) {
                      const { childImageSharp: { sizes }} = image
                      if (sizes && sizes.aspectRatio) {
                        const { aspectRatio, src, srcSet } = sizes
                        const srcSetArray = srcSet.split(',')
                        sizes.sizes = '500px'
                        images.push(src)
                        photos.push({
                          width: aspectRatio,
                          height: 1,
                          src,
                          srcSet: srcSetArray,
                          sizes: [sizes.sizes],
                          originalSizes: sizes,
                          imageIndex: images.length - 1
                        })
                        //console.log('sizes: ', image, index, refKey)
                      } else {
                        console.log('!sizes: ', image, index, refKey)
                      }
                    }
                  })
                }
                <Responsive maxWidth={`96rem`}>
                  <Gallery
                    margin={16}
                    columns={portfolio.columns || 3}
                    balanced={!portfolio.columns}
                    ImageComponent={renderImage}
                    photos={photos}
                    onClick={openLightbox}
                  />
                </Responsive>
                <Responsive minWidth={`96rem`} maxWidth={`146rem`}>
                  <Gallery
                    margin={16}
                    columns={portfolio.columns || 4}
                    balanced={!portfolio.columns}
                    ImageComponent={renderImage}
                    photos={photos}
                    onClick={openLightbox}
                  />
                </Responsive>
                <Responsive minWidth={`146rem`}>
                  <Gallery
                    margin={16}
                    columns={portfolio.columns || 5}
                    balanced={!portfolio.columns}
                    ImageComponent={renderImage}
                    photos={photos}
                    onClick={openLightbox}
                  />
                </Responsive>
                </div>
              </Waypoint>
            )
          })
        }
      </div>
    )
  }

}

export class Videos extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.videos.length !== nextProps.videos.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Video`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Video`)
    }
  }

  render() {
    const {
      videos
    } = this.props
    //console.log("Videos render method called!")

    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            paddingTop: '5rem',
            paddingBottom: '10rem',
            textAlign: 'center',
            margin: '0',
            display: `flex`,
            flexFlow: `wrap`
          }}
        >
        {
          videos.map((video, index) =>
            <div
              css={{
                margin: '1rem',
                width: `calc(50% - 2rem)`
              }}
            >
            <Video
              key={index}
              url={`https://vimeo.com/${video.url}`}
              poster={video.poster}
              title={video.title}
              ratio={video.ratio}
            />
            </div>
          )
        }
        </div>
      </Waypoint>
    )
  }
}

export class Instagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.instagram.length !== nextProps.instagram.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Instagram`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Instagram`)
    }
  }

  render() {
    const {
      instagram,
      biography
    } = this.props
    //console.log("Instagram render method called!")

    const photos = []
    instagram.forEach((photo) => {
      photos.push({
        width: 1,
        height: 1,
        originalSizes: {
          src: photo.media,
          aspectRatio: 1
        }
      })
    })

    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            paddingTop: '5rem',
            paddingBottom: '10rem',
            textAlign: 'center'
          }}
        >
        <div css={{margin: '5rem 0 5rem'}}>
          <HeaderMD
            weight={400}
          >
            <a href={`https://instagram.com/${biography.instagram}`} target='_blank'>{`${biography.instagram}`}</a>
          </HeaderMD>
          <Paragraph>
            {`${biography.followers} followers`}
          </Paragraph>
        </div>

        <Gallery
          margin={16}
          columns={4}
          ImageComponent={renderInstagramImage}
          photos={photos}
        />
        </div>
      </Waypoint>
    )
  }
}

export class Biography extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.biography.length !== nextProps.biography.length) {
      return true
    } else {
      return false
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Biography`)
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Biography`)
    }
  }

  render() {
    const {
      biography
    } = this.props
    //console.log("Biography render method called!")


    return (
      <Waypoint
        ref={this.handleRef}
        topOffset={-50}
        botttomOffset={-50}
        onPositionChange={this.handlePositionChange}
      >
        <div
          css={{
            maxWidth: '37rem',
            margin: '0 auto 5rem'
          }}
          dangerouslySetInnerHTML={{ __html: biography.text }}
        />
      </Waypoint>
    )
  }
}




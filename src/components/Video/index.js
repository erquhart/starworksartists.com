import React, { Component } from 'react'
import Player from 'react-player'

import { ResponsiveHeader, HeaderLG, HeaderMD, HeaderXS, HeaderSM } from '../Styled'
import { YELLOW, PURPLE, EASE } from '../../utils/presets'


export default class Video extends Component {

  state = {
    playing: false
  }

  handleClick = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  render () {
    return (
      <div // wrapper
        css={{
          position: 'relative',
          paddingBottom: this.props.ratio || '56.25%', /* 16:9 */
          ...this.props.style
        }}
      >
        <div // cover
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            display: 'flex',
            opacity: this.state.playing ? 0 : 1,
            pointerEvents: this.state.playing ? 'none' : 'auto',
            transition: `opacity 300ms ${EASE}`,
            overflow: 'hidden',
            backgroundColor: YELLOW
          }}
          onClick={this.handleClick}
        >
          <div
            css={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              bottom: '-6px',
              left: '-6px',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent',
              backgroundImage: `url(${this.props.poster})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              filter: 'blur(5px)',
              opacity: 0.4
            }}
          />
          {/*
          <Svg
            path={ 'static/assets/icons/play.svg' }
            className={ 'play-icon' }
            style={{
              filter: 'drop-shadow(12px 12px 7px rgba(0,0,0,0.5))',
              width: '5rem'
            }}
          />
          */}
          <ResponsiveHeader
            blur
            weight={700}
            uppercase
          >
            {this.props.title}
          </ResponsiveHeader>
        </div>
        <Player
          css={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          width='100%'
          height='100%'
          url={this.props.url}
          playing={this.state.playing}
          config={{
            vimeo: {
              playerOptions: {
                color: YELLOW,
                portrait: false,
                title: false,
                byline: false,
              }
            }
          }}
        />
      </div>
    )
  }
}
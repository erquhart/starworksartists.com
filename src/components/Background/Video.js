import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { EASE } from '../../utils/presets'

export default class Video extends Component {
  state = {
  }

  componentDidMount() {
    if (this.props.playing) {
      this.video.play()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playing !== nextProps.playing) {
      if (nextProps.playing) {
        this.video.play()
        // this.video.playbackRate = 0.005
      } else {
        this.video.pause()
      }
    }
  }

  render () {

    const { blur, opacity } = this.props

    return <video
      ref={ref => this.video = ref}
      css={{
        position: `fixed`,
        width: `100%`,
        height: `100%`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        objectFit: `cover`,
        transition: `600ms opacity ${EASE}, 600ms filter ${EASE}, transform 600ms ${EASE}`,
        zIndex: `-1`,
        overflow: `hidden`,
      }}
      style={{
        filter: blur ? 'blur(50px)' : 'blur(0)',
        transform: blur ? `scale(1.1)` : `scale(1)`,
        opacity: opacity
      }}
      tabIndex='0'
      loop
      webkit-playsinline="true"
      type="video/mp4; codecs=&quot;h.264&quot;"
      src={`/video/output.mp4`}
    />
  }

}
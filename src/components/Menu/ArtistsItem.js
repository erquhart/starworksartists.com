import React, { Component } from 'react'

import { basekick } from '../../utils/typography'

import { Blurry } from '../Styled'
import Emdash from '../Emdash'

export default class Item extends Component {
  constructor(props) {
    super(props)

    let opacity
    if (props.active) {
      opacity = 1
    } else {
      opacity = 0.3
    }

    this.state = { opacity }
  }

  componentWillReceiveProps(nextProps) {

    if (
      this.props.isHovered !== nextProps.isHovered ||
      this.props.active !== nextProps.active
    ) {

      let opacity
      if (nextProps.active) {

        // console.log('nextProps.active!', this.props.title)
        opacity = 1
      } else {
        opacity = 0.3
        if (typeof(nextProps.isHovered) !== 'undefined') {
          if (nextProps.isHovered) {
            opacity = 0.6
          } else {
            opacity = 0
          }
        }
      }

      this.setState({opacity})

    }

  }

  handleOnClick = () => {
    if (this.props.onClick) {
      const key = this.props.title.replace(/\s/g, '').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
      // .replace(/\s/g, '')
      this.props.onClick(key, true)
    }
  }

  render() {

    const { title } = this.props

    return (
      <div
        onClick={this.handleOnClick}
        css={{
          width: '16rem',
          textAlign: 'right',
          padding: '1rem 3rem 1rem 0',
          position: `relative`,
          ':hover > .nav-label': {
            opacity: 1
          }
        }}
      >
        <div
        className={`nav-label`}
        css={{
          transition: 'opacity 300ms ease-in-out',
          opacity: this.state.opacity,
          willChange: `opacity`
        }}
        >
          <Blurry>{title.replace(/-/g, ' ')}</Blurry>
        </div>
        <Emdash
          opacity={ this.props.active ? 0.6 : 0.3 }
          top={'35px'}
        />
      </div>
    )
  }

}

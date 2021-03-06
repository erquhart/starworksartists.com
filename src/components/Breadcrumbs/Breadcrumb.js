import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Blurry } from '../Styled'

import { Transition } from "react-transition-group"
import getTransitionStyle from "../../utils/getTransitionStyle"

const timeout = 300

export default class Breadcrumb extends Component {
/*
  state = {
    show: false
  }

  componentDidMount() {
    //setTimeout(() => this.setState({show: true}), 500)
    this.setState({show: true})
  }
*/
  render () {
    const { path, name, opacity, prepend, textShadow } = this.props

    const transitionProps = {
      timeout: {
        enter: 0,
        exit: timeout,
      },
      in: true,
      appear: true,
    }

    return (
      <Transition
        timeout={{
          enter: 0,
          exit: 300
        }}
        in={true}
        appear={true}
      >
        {(status) => (
          <span
            style={ getTransitionStyle({ status, timeout }) }
          >
            <Blurry
              inline
              opacity={opacity}
              status={status}
              style={{
                opacity: opacity,
                ':hover': {
                  opacity: 1
                },
                textShadow: textShadow ? `#575483 1px 0 16px` : 'none'
              }}
              weight={ textShadow ? 700 : 200}
            >
              <Link to={`/${path}`}>{name}</Link>
            </Blurry>
            {
              prepend && (
                <Blurry inline opacity={0.3} style={{ margin: `0 1rem` }}>{`/`}</Blurry>
              )
            }
          </span>
        )}
      </Transition>
    )
  }
}

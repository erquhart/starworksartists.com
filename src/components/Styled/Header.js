import React from 'react'
import { basekick } from '../../utils/typography'
import {
  MIN_MOBILE_MQ,
  MIN_TABLET_MQ,
  MIN_DEFAULT_MQ,
  MIN_LARGE_DISPLAY_MQ,
  MIN_LARGER_DISPLAY_MQ,
  EASE
} from '../../utils/presets'

export const HeaderXL = ({ children, style, onClick, weight }) => (
  <h1
    onClick={onClick}
    css={{
      filter: 'blur(3px)',
      letterSpacing: '6px',
      textTransform: 'uppercase',
      fontWeight: 200,
      ...basekick({
        typeSizeModifier: 6,
        typeRowSpan: 11,
      }),
      fontWeight: weight || 200,
      ...style
    }}
  >
    {children}
  </h1>
)

export const HeaderLG = ({ children, style, uppercase, blur, weight }) => (
  <h2
    css={{
      transform: `color 300ms ${EASE}`,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      letterSpacing: uppercase ? '2px' : 0,
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: weight || 200,
      ...basekick({
        typeSizeModifier: 2,
        typeRowSpan: 5,
      }),
      marginBottom: 0,
      ...style
  }}
  >
    {children}
  </h2>
)

export const HeaderMD = ({ children, style, uppercase, blur, weight }) => (
  <h2
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: weight || 200,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 1.125,
        typeRowSpan: 2,
      }),
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.5,
          typeRowSpan: 4,
        }),
      },
      ...style
    }}
  >
    {children}
  </h2>
)

export const HeaderSM = ({ children, style, uppercase, blur, weight }) => (
  <h3
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: weight || 200,
      fontWeight: 400,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 1,
        typeRowSpan: 2,
      }),
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.125,
          typeRowSpan: uppercase ? 2.75 : 4,
        }),
      },
      ...style
    }}
  >
    {children}
  </h3>
)

export const HeaderXS = ({ children, style, uppercase, blur }) => (
  <h3
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: 700,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: uppercase ? 2 : 3,
      }),
      ...style
    }}
  >
    {children}
  </h3>
)

export const Paragraph = ({ children, style }) => (
  <p
    css={{
      fontWeight: 400,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: 3,
      }),
      ...style
    }}
  >
    {children}
  </p>
)

export const Blurry = ({ children, style, inline, opacity, weight }) => (
  <div
    css={{
      opacity: opacity || 1,
      //transition: `opacity 300ms ${EASE}`,
      display: inline ? 'inline-block' : 'block',
      filter: 'blur(1px)',
      letterSpacing: '3px',
      textTransform: 'lowercase',
      ...basekick({
        //typeSizeModifier: 0.875,
        typeSizeModifier: 0.9375,
        //typeSizeModifier: 1,
        typeRowSpan: 3,
      }),
      fontWeight: weight || 200,
      ...style
    }}
  >
    {children}
  </div>
)


export const ResponsiveHeader = ({ children, style, uppercase, blur, weight }) => (
  <h3
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: weight || 200,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 1,
        typeRowSpan: 2,
      }),
      padding: `2rem`,
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.125,
          typeRowSpan: uppercase ? 3 : 4,
        }),
        maxWidth: `26rem`
      },
      [MIN_LARGE_DISPLAY_MQ]: {
        ...basekick({
          typeSizeModifier: 1.5,
          typeRowSpan: 3.5,
        }),
        maxWidth: `30rem`
      },
      [MIN_LARGER_DISPLAY_MQ]: {
        ...basekick({
          typeSizeModifier: 2,
          typeRowSpan: 5,
        }),
        maxWidth: `40rem`
      },
      ...style
    }}
  >
    {children}
  </h3>
)


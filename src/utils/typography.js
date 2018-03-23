import Typography from "typography"


export const basekick = (options) => {

  const settings = {
    baseFontSize: 16,
    gridRowHeight: 8,
    typeSizeModifier: 2,
    descenderHeightScale: 0.2,
    ...options
  }

  const calculateLineHeightAsScale = (lineHeight) => {
    return (lineHeight / (settings.typeSizeModifier * settings.baseFontSize))
  }

  const calculateTypeOffset = (lineHeightScale) => {
    return ((lineHeightScale - 1) / 2) + settings.descenderHeightScale
  }

  const lineHeightScale = calculateLineHeightAsScale(settings.lineHeightOverride || (settings.typeRowSpan * settings.gridRowHeight))
  const typeOffset = calculateTypeOffset(lineHeightScale)

  return {
    fontSize: (settings.typeSizeModifier * settings.baseFontSize) + 'px',
    lineHeight: lineHeightScale + 'em',
    transform: 'translateY(' + typeOffset + 'em)'
  }

}

export const options = {
  baseFontSize: `16px`,
  baseLineHeight: `32px`,
  scaleRatio: 2,
  headerColor: `inherit`,
  bodyColor: `inherit`,
  blockMarginBottom: 0.75,
  headerFontFamily: [`basis`, `sans-serif`],
  bodyFontFamily: [`basis`, `sans-serif`],
  overrideStyles: () => {
    return {
      html: {
        overflowY: `scroll`,
      },
      'h1,h2,h3,h5,h5,h6': {
        fontWeight: 200
      },
      p: {
        fontWeight: 400,
        letterSpacing: `0.03em`,
        marginBottom: `1rem`,
        ...basekick({
          typeSizeModifier: 1,
          typeRowSpan: 3.25,
        })
      },
      a: {
        color: `inherit`,
        textDecoration: 'none'
      },
    }
  },
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography

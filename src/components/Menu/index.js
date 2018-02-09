import React, { Component } from 'react'

import Item from './Item'
import Toggle from './Toggle'

const Menu = ({
  isCover,
  type,
  sections,
  scrollToSection,
  currentSection
}) => {
  return (
    <div
      css={{
        position: 'fixed',
        zIndex: 2000
      }}
    >

      <ul
        css={{
          marginLeft: 0,
          marginTop: '3rem',
          marginBottom: 0,
          listStyle: 'none',
          textAlign: 'right',
        }}
      >
        <li
          css={{
            marginBottom: '10rem'
          }}
        >
          <Toggle>{type}</Toggle>
        </li>
        {
          sections.map((section, i) => {
            return <li
              key={i}
              onClick={() => scrollToSection(i, section.key)}
              css={{
                cursor: 'pointer',
                marginBottom: '2rem',
                transition: 'opacity 800ms ease-out, transform 600ms ease-out, 600ms filter ease-out',
                transform: !isCover ? 'translate3d(0,0,0)' : 'translate3d(0,-40px,0)',
                opacity: !isCover ? 1 : 0
              }}
            >
              <Item
                title={section.title}
                active={currentSection === section.key}
              />
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Menu

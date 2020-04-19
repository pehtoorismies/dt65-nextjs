import React from 'react'
import { Flex } from 'rebass/styled-components'

const PortalOverlay = (props: any) => (
  <Flex
    {...props}
    bg="moreTransparentBlack"
    height="100vh"
    width="100vw"
    alignItems="center"
    justifyContent="center"
    sx={{
      position: 'fixed',
      zIndex: 4,
      top: 0,
      left: 0,
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
    }}
  />
)

export default PortalOverlay

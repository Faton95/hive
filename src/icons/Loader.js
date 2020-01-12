import React from 'react'
import SvgIcons from './SvgIcon'

export default props => (
  <SvgIcons
    viewBox="0 0 40 40"
    version="1.1"
    id="L9"
    fill="#fff"
    fontSize="unset"
    width="40"
    height="40"
    enableBackground="new 0 0 0 0"
    {...props}
  >
    <circle stroke="none" cx="5" cy="20" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle stroke="none" cx="20" cy="20" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle stroke="none" cx="35" cy="20" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </SvgIcons>
)

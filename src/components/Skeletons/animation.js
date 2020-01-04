import { keyframes } from 'styled-components'

export const animateFlash = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`
export default `${animateFlash.name} 400ms linear infinite alternate`

import { createGlobalStyle, keyframes } from 'styled-components'


export const animateFlash: any = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`

export default createGlobalStyle`
  * {
    ::-webkit-scrollbar {
      height: 14px;
      width: 14px;
    }
    ::-webkit-scrollbar-track {
      background: #f9f9f9;
      border: ${props => props.theme.cube.border};
    }
    ::-webkit-scrollbar-thumb {
      background-color: #b7bfcb;
      border: 3px solid #f9f9f9;
      border-radius: 50px;
    }
  }
  body, #app {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    height: auto;
    margin: 0
  }

  body {
    background-color: #f6f6f6;
    font-family: 'GothamPro', sans-serif;
    font-size: 14px;
  }
  
  b, strong {
    font-weight: 500;
  }
  
  ${animateFlash.rules}
`

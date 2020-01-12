import React from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from 'ui-cubic'

export const showToast = ({ type, ...params }) => {
  toast(<Toaster type={type} {...params} />, params)
}

const StyledToastConteiner = styled(ToastContainer)`
  &.toast_container {
    padding: 0;
    width: auto;
    &.Toastify__toast-container--top-left {
      top: 36px;
      left: 22px;
    }
    & .toast {
      background: none;
      box-shadow: none;
      font-family: inherit;
      padding: 0;
      overflow: unset;
    }
  }
`

const Toast = () => (
  <StyledToastConteiner
    autoClose={5000}
    closeButton={false}
    hideProgressBar={true}
    pauseOnHover={false}
    position={toast.POSITION.TOP_LEFT}
    className="toast_container"
    toastClassName="toast"
  />
)

export default Toast

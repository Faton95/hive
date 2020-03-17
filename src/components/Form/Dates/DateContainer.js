import styled from 'styled-components'

export default styled('div')`
  & .DateInput_input {
    background-color: ${props => props.theme.input.backgroundColor};
    border-radius: 8px;
    border-bottom: 0;
    font-family: inherit;
    font-size: 15px;
    font-weight: 400;
    height: ${props => props.height}px;
    padding: 0 20px 0 45px;
    transition: background-color 200ms;
  }
  
  & .DateInput_input__disabled {
      background-color:#fafbfc;
      font-style: unset !important;
      pointer-events: none;
  }

  & .DateInput_input::placeholder {
    color: ${props => props.theme.input.placeholderColor};
  }

  & .DateInput_input:hover {
    background-color: ${props => props.theme.input.backgroundColorHover};
  }
  
  & .SingleDatePickerInput__disabled {
    background-color: transparent;
  }
  & .SingleDatePickerInput__showClearDate {
    padding-right: 0;
  }
  
  & .SingleDatePicker_picker {
    z-index: 10;
  }
  
  & .SingleDatePickerInput_calendarIcon {
    position: absolute;
    z-index: 1;
    top: 50%;
    margin-left: 5px;
    transform: translateY(-50%);
  }
  
  & .DateInput__disabled {
    background: transparent;
  }
`

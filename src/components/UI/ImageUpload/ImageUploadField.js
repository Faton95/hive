import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { prop } from 'ramda'
import Person from 'images/person.png'
import useFileUploads from './useFileUploads'

const Input = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -999;
`

const Label = styled('label')`
  display: inline-block;
`

const ImageField = styled('div')`
  align-items: center;
  border: 1px solid #ced0dd;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 78px;
  transition: 200ms;
  overflow: hidden;
  width: 78px;
  &:hover {
    border-color: green;
  }
`

const Image = styled('div')`
  background-image: ${({ url }) => (url ? `url(${url})` : 'none')};
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
`

const Placeholder = styled('div')`
  color: green;
  font-weight: 500;
  text-align: center;
  & svg {
    color: #d3d5db;
    font-size: 38px;
    display: block;
    margin: 0 auto 7px;
  }
`

const ImageUploadField = props => {
  const {
    label,
    input: { name, value },
    onSuccess
  } = props

  const [state, onChange] = useFileUploads({ input: props.input, onSuccess })
  const { loading, error } = state

  const inputId = `imageInput-${name}`
  const src = prop('file', value)
  return (
    <div>
      <div>{label}</div>
      <Input onChange={onChange} type="file" id={inputId} />
      <Label htmlFor={inputId}>
        <ImageField>
          {src ? (
            <Image url={src} />
          ) : (
            <Placeholder>
              <div>{loading ? 'loading...' : <img src={Person} alt="person" />}</div>
            </Placeholder>
          )}
        </ImageField>
      </Label>
      <div>{prop('detail', error)}</div>
    </div>
  )
}

ImageUploadField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired
}

export default ImageUploadField

import styled from 'styled-components'

export const BigInput = styled.input`
  width: 100%;
  height: ${(props) => props.size}px;
  padding: 5px;
  border: 0;
  color: red;
  background: none;
  outline: none;
  color: #2c1917;

  font-size: ${(props) => props.size}px;
  font-family: 'Titillium Web', 'sans serif';
  font-weight: 600;
  text-align: center;
  &:focus {
  }
  ::placeholder {
    font-weight: 600;
  }
`

BigInput.defaultProps = {
  size: 30,
}

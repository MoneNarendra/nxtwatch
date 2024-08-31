import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoginMainContainer = styled.div`
  padding: 30px;
  width: 90%;
  max-width: 350px;
  min-height: 300px;
  box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#0f0f0f')};
`

export const LabelEle = styled.label`
  font-family: 'Roboto';
  font-size: 13px;
  color: ${props => (props.lightTheme ? '#898d9a' : '#ffffff')};
  font-weight: bold;
`

export const InputEle = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px;
  outline: none;
  border: 1px solid #dee5ed;
  border-radius: 5px;
  font-family: 'Roboto';
  font-size: 13px;
  margin-bottom: 10px;
  margin-top: 3px;
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#000000')};
  color: ${props => (props.lightTheme ? '#000000' : '#ffffff')};
`

export const CheckBoxLabel = styled.label`
  font-family: 'Roboto';
  font-size: 13px;
  color: ${props => (props.lightTheme ? '#898d9a' : '#ffffff')};
  font-weight: 500;
}`

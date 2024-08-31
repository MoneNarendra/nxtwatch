import styled from 'styled-components'

export const GamingVideosSerchContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  min-height: 90vh;
`

export const ErrorHeading = styled.h1`
  color: ${props => (props.lightTheme ? '#00000' : '#ffffff')};
`

export const GamingMainContainer = styled.div`
  color: ${props => (props.lightTheme ? '#00000' : '#ffffff')};
`

export const GamingTopSection = styled.div`
  background-color: ${props => (props.lightTheme ? '#f1f1f1' : '#181818')};
  color: ${props => (props.lightTheme ? '#1e2e5f' : '#ffffff')};
`

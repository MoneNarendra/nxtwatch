import styled from 'styled-components'

export const HomeVideosSerchContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  min-height: cals(100vh - 10vh - 180px);
`
export const SerchContainer = styled.div`
  align-self: center;
  width: 90%;
  margin-top: 10px;
  display: flex;
  height: 35px;
  @media (min-width: 767px) {
    align-self: flex-start;
    width: 40%;
  }
`

export const SerchEle = styled.input`
  padding: 8px;
  width: 100%;
  height: 100%;
  outline: none;
  border: 2px solid ${props => (props.lightTheme ? '#cccccd' : '#403f40')};
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  font-family: 'Roboto';
  color: ${props => (props.lightTheme ? '#212121' : '#ffffff')};
  font-size: 13px;
`

export const SerchBtn = styled.button`
  height: 100%;
  width: 65px;
  border: 2px solid ${props => (props.lightTheme ? '#cccccd' : '#403f40')};
  border-left-width: 0px;
  background-color: ${props => (props.lightTheme ? '#f4f4f4' : '#303031')};
  color: ${props => (props.lightTheme ? '#8b898a' : '#616060')};
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
`
export const VideoBottomText = styled.div`
  color: ${props => (props.lightTheme ? '#00000' : '#ffffff')};
  margin-top: 0px;
`
export const ErrorHeading = styled.h1`
  color: ${props => (props.lightTheme ? '#00000' : '#ffffff')};
`
export const VideosContainer = styled.div`
  overflow-y: scroll;
  height: ${props => (props.showBanner ? '50' : '80')}vh;
  list-style-type: none;
  padding-left: 0px;
  display: grid;
  margin-top: 10px;
  @media (min-width: 768px) {
    grid-template-columns: auto auto;
    height: ${props => (props.showBanner ? '60' : '81')}vh;
  }
  @media (min-width: 1024px) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 1440px) {
    grid-template-columns: auto auto auto auto;
  }
`

export const FailureContainer = styled.div`
  height: ${props => (props.showBanner ? '60' : '83')}vh;
`

import styled from 'styled-components'

export const SidebarBgContainer = styled.div`
  @media (max-width: 767px) {
    display: none;
  }

  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const SidebarBgSmContainer = styled.div`
  @media (min-width: 767px) {
    display: none;
  }
  background-color: ${props => (props.lightTheme ? '#ffffff' : '#212121')};
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40vh;
`

export const ListEleSidenavbar = styled.li`
  background-color: ${props => {
    let bgColor
    if (props.lightTheme && props.isActive) {
      bgColor = '#f1f5f9'
    } else if (props.lightTheme && props.isActive === false) {
      bgColor = '#ffffff'
    } else if (props.lightTheme === false && props.isActive) {
      bgColor = '#383838'
    } else {
      bgColor = '#212121'
    }
    return bgColor
  }};
  padding-left: 20px;
  display: flex;
  align-items: center;
  width: 180px;
`
export const ListEleSidenavbarSm = styled.li`
  background-color: ${props => {
    let bgColor
    if (props.lightTheme && props.isActive) {
      bgColor = '#f1f5f9'
    } else if (props.lightTheme && props.isActive === false) {
      bgColor = '#ffffff'
    } else if (props.lightTheme === false && props.isActive) {
      bgColor = '#383838'
    } else {
      bgColor = '#212121'
    }
    return bgColor
  }};
  padding-left: 20px;
  display: flex;
  align-items: center;
  width: 90vw;
  display: flex;
  justify-content: center;
`

export const SidebarText = styled.p`
  color: ${props => (props.lightTheme ? '#615c62' : '#ffffff')};
  font-family: 'Roboto';
  font-size: 15px;
  margin-left: 20px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`

export const BottomHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 16px;
  color: ${props => (props.lightTheme ? '#305e9b' : '#ffffff')};
`

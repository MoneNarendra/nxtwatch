import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'
import Popup from 'reactjs-popup'

import {IoLogOutOutline, IoMoon, IoMenu, IoSunny} from 'react-icons/io5'

import {
  NavContiainer,
  BtnICons,
  ModelCon,
  ModelHeading,
  CanceBtn,
  ConfirmBtn,
  SmMenuContainer,
  CloseBtn,
} from './styledComponents'

import SideNavBar from '../SideNavBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Header extends Component {
  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme, onChangeTheme, onChangeActiveNav} = value
          const onClickChangeTheme = () => {
            onChangeTheme()
          }

          const onClickLogo = () => {
            onChangeActiveNav('/')
          }

          const StyledPopup = styled(Popup)`
            &-content {
              background-color: ${lightTheme ? '#ffffff' : '#212121'};
              height: 100vh;
              width: 100vw;
              padding: 0px;
            }
          `

          return (
            <NavContiainer lightTheme={lightTheme}>
              <div className="nav-inner-container">
                <Link to="/" onClick={onClickLogo}>
                  <img
                    src={
                      lightTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    }
                    alt="website logo"
                    className="nav-logo"
                  />
                </Link>
                <div className="sm-nav-left-container">
                  <BtnICons
                    lightTheme={lightTheme}
                    type="button"
                    label="text"
                    onClick={onClickChangeTheme}
                    data-testid="theme"
                  >
                    {lightTheme ? (
                      <IoMoon className="sm-icons" />
                    ) : (
                      <IoSunny className="sm-icons" />
                    )}
                  </BtnICons>
                  <StyledPopup
                    modal
                    trigger={
                      <BtnICons
                        type="button"
                        label="text"
                        lightTheme={lightTheme}
                      >
                        <IoMenu className="sm-icons" />
                      </BtnICons>
                    }
                  >
                    {close => (
                      <div className="sm-inner-container">
                        <div className="sm-close-container">
                          <CloseBtn
                            type="button"
                            onClick={close}
                            className="close-btn"
                            lightTheme={lightTheme}
                          >
                            &#10006;
                          </CloseBtn>
                        </div>
                        <SmMenuContainer lightTheme={lightTheme}>
                          <SideNavBar device="sm" />
                        </SmMenuContainer>
                      </div>
                    )}
                  </StyledPopup>
                  <Popup
                    modal
                    trigger={
                      <BtnICons
                        type="button"
                        label="text"
                        lightTheme={lightTheme}
                      >
                        <IoLogOutOutline className="sm-icons" />
                      </BtnICons>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <ModelCon lightTheme={lightTheme}>
                        <ModelHeading lightTheme={lightTheme}>
                          Are you sure, you want to logout?
                        </ModelHeading>
                        <div className="mode-btn-container">
                          <CanceBtn
                            onClick={close}
                            type="button"
                            lightTheme={lightTheme}
                          >
                            Cancel
                          </CanceBtn>
                          <ConfirmBtn
                            className="model-btns confirm-btn"
                            type="button"
                            onClick={this.onClickLogOut}
                          >
                            Confirm
                          </ConfirmBtn>
                        </div>
                      </ModelCon>
                    )}
                  </Popup>
                </div>
                <div className="lg-nav-left-container">
                  <BtnICons
                    type="button"
                    label="text"
                    lightTheme={lightTheme}
                    onClick={onClickChangeTheme}
                    data-testid="theme"
                  >
                    {lightTheme ? (
                      <IoMoon className="lg-icons" />
                    ) : (
                      <IoSunny className="lg-icons" />
                    )}
                  </BtnICons>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />

                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout-btn">
                        Logout
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <ModelCon lightTheme={lightTheme}>
                        <ModelHeading lightTheme={lightTheme}>
                          Are you sure, you want to logout?
                        </ModelHeading>
                        <div className="mode-btn-container">
                          <CanceBtn
                            onClick={close}
                            type="button"
                            lightTheme={lightTheme}
                          >
                            Cancel
                          </CanceBtn>
                          <ConfirmBtn
                            className="model-btns confirm-btn"
                            type="button"
                            onClick={this.onClickLogOut}
                          >
                            Confirm
                          </ConfirmBtn>
                        </div>
                      </ModelCon>
                    )}
                  </Popup>
                </div>
              </div>
            </NavContiainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(Header)

import {Link} from 'react-router-dom'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {RiFireFill} from 'react-icons/ri'

import {IoGameController} from 'react-icons/io5'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  SidebarBgContainer,
  SidebarBgSmContainer,
  ListEleSidenavbar,
  SidebarText,
  BottomHeading,
  ListEleSidenavbarSm,
} from './styledComponets'

import './index.css'

const sideBar = [
  {
    id: '/',
    text: 'Home',
  },
  {
    id: '/trending',
    text: 'Trending',
  },
  {
    id: '/gaming',
    text: 'Gaming',
  },
  {
    id: '/saved-videos',
    text: 'Saved videos',
  },
]

const SideNavBar = props => {
  const {device} = props
  const rederIcon = (id, activeCom) => {
    let ele
    const activeIcon = activeCom === id ? 'active-icon' : ''
    if (id === sideBar[0].id) {
      ele = <MdHome className={`sidebar-icon ${activeIcon}`} />
    } else if (id === sideBar[1].id) {
      ele = <RiFireFill className={`sidebar-icon ${activeIcon}`} />
    } else if (id === sideBar[2].id) {
      ele = <IoGameController className={`sidebar-icon ${activeIcon}`} />
    } else {
      ele = <MdPlaylistAdd className={`sidebar-icon ${activeIcon}`} />
    }
    return ele
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme, onChangeActiveNav, activeCom} = value
        const renderResult =
          device === 'lg' ? (
            <SidebarBgContainer lightTheme={lightTheme}>
              <ul className="side-bar-list-container">
                {sideBar.map(eachEle => {
                  const onClickNavEle = () => {
                    onChangeActiveNav(eachEle.id)
                  }
                  const isActive = activeCom === eachEle.id
                  return (
                    <Link to={eachEle.id} key={eachEle.id}>
                      <button
                        type="button"
                        className="ele-btn"
                        onClick={onClickNavEle}
                        key={eachEle.id}
                      >
                        <ListEleSidenavbar
                          lightTheme={lightTheme}
                          key={eachEle.id}
                          isActive={isActive}
                        >
                          {rederIcon(eachEle.id, activeCom)}
                          <SidebarText
                            lightTheme={lightTheme}
                            isActive={isActive}
                          >
                            {eachEle.text}
                          </SidebarText>
                        </ListEleSidenavbar>
                      </button>
                    </Link>
                  )
                })}
              </ul>
              <div className="sidebar-bottom">
                <BottomHeading lightTheme={lightTheme}>
                  CONTACT US
                </BottomHeading>
                <ul className="sidebar-img-container">
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                      className="img-ele"
                    />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                      className="img-ele"
                    />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked logo"
                      className="img-ele"
                    />
                  </li>
                </ul>
                <BottomHeading lightTheme={lightTheme}>
                  Enjoy! Now to see your channels and recommendations!
                </BottomHeading>
              </div>
            </SidebarBgContainer>
          ) : (
            <SidebarBgSmContainer lightTheme={lightTheme}>
              <ul className="side-bar-list-container-sm">
                {sideBar.map(eachEle => {
                  const onClickNavEle = () => {
                    onChangeActiveNav(eachEle.id)
                  }
                  const isActive = activeCom === eachEle.id
                  return (
                    <Link to={eachEle.id} key={eachEle.id}>
                      <button
                        type="button"
                        className="ele-btn sm-btn-ele"
                        onClick={onClickNavEle}
                        key={eachEle.id}
                      >
                        <ListEleSidenavbarSm
                          lightTheme={lightTheme}
                          key={eachEle.id}
                          isActive={isActive}
                        >
                          {rederIcon(eachEle.id, activeCom)}
                          <SidebarText
                            lightTheme={lightTheme}
                            isActive={isActive}
                          >
                            {eachEle.text}
                          </SidebarText>
                        </ListEleSidenavbarSm>
                      </button>
                    </Link>
                  )
                })}
              </ul>
            </SidebarBgSmContainer>
          )

        return renderResult
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SideNavBar

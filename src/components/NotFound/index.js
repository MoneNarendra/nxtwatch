import Header from '../Header'
import SideNavBar from '../SideNavBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  TrendingVideosSerchContainer,
  ErrorHeading,
  TrendingMainContainer,
} from './styledComponents'

import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {lightTheme} = value

      const failureImg = lightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

      return (
        <TrendingMainContainer
          className="trending-main-container"
          lightTheme={lightTheme}
        >
          <Header />
          <div className="trending-container">
            <SideNavBar device="lg" />
            <div className="content-container">
              <TrendingVideosSerchContainer
                lightTheme={lightTheme}
                className="loading-container"
              >
                <img
                  src={failureImg}
                  alt="not found"
                  className="failed-img no-saved-video-img"
                />
                <ErrorHeading lightTheme={lightTheme} className="error-heading">
                  Page Not Found
                </ErrorHeading>
                <p className="error-dic">
                  We are sorry, the page you requested could not be found.
                </p>
              </TrendingVideosSerchContainer>
            </div>
          </div>
        </TrendingMainContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound

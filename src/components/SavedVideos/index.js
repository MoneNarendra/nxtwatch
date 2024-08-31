import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import SideNavBar from '../SideNavBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  TrendingVideosSerchContainer,
  ErrorHeading,
  TrendingMainContainer,
  TrendingTopSection,
} from './styledComponents'

import './index.css'

class SavedVideos extends Component {
  eachVideoElement = (eachVideo, onClickLogo, lightTheme) => (
    <Link
      to={`videos/${eachVideo.id}`}
      className="link-ele"
      key={eachVideo.id}
      onClick={onClickLogo}
    >
      <li className="each-video-item" key={eachVideo.id}>
        <img
          src={eachVideo.thumbnailUrl}
          className="thumbnail-img"
          alt={eachVideo.title}
        />

        <div className="video-bottom-container">
          <img
            src={eachVideo.channel.profileImageUrl}
            className="channel-img"
            alt={eachVideo.channel.name}
          />
          <TrendingMainContainer lightTheme={lightTheme}>
            <div className="text-container">
              <h1 className="each-video-name">{eachVideo.title}</h1>
              <div className="bottom-main">
                <p className="bottom-text">{eachVideo.channel.name}</p>
                <ul className="bottom-text-container">
                  <li className="bottom-text">{eachVideo.viewCount}</li>
                  <li className="bottom-text">
                    {formatDistanceToNow(new Date(eachVideo.publishedAt))
                      .split(' ')
                      .splice(1)}{' '}
                    ago
                  </li>
                </ul>
              </div>
            </div>
          </TrendingMainContainer>
        </div>
      </li>
    </Link>
  )

  renderFailureView = lightTheme => (
    <TrendingVideosSerchContainer
      lightTheme={lightTheme}
      className="loading-container"
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="failed-img no-saved-video-img"
      />
      <ErrorHeading lightTheme={lightTheme} className="error-heading">
        No saved videos found
      </ErrorHeading>
      <p className="error-dic">You can save your videos while watching them</p>
    </TrendingVideosSerchContainer>
  )

  renderSavedVideos = (lightTheme, savedVideos, onClickLogo) => (
    <div className="content-container">
      <TrendingVideosSerchContainer lightTheme={lightTheme}>
        <TrendingTopSection
          className="trending-top-section"
          lightTheme={lightTheme}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2112/2112959.png"
            alt="trending"
            className="trending-img"
          />
          <h1 className="trending-heading">Saved Videos</h1>
        </TrendingTopSection>
        <ul className="trending-videos-container">
          {savedVideos.map(eachVideo =>
            this.eachVideoElement(eachVideo, onClickLogo, lightTheme),
          )}
        </ul>
      </TrendingVideosSerchContainer>
    </div>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme, savedVideos, onChangeActiveNav} = value
          const onClickLogo = () => {
            onChangeActiveNav('')
          }
          return (
            <TrendingMainContainer
              className="trending-main-container"
              lightTheme={lightTheme}
            >
              <Header />
              <div className="trending-container">
                <SideNavBar device="lg" />
                {savedVideos.length > 0
                  ? this.renderSavedVideos(lightTheme, savedVideos, onClickLogo)
                  : this.renderFailureView(lightTheme)}
              </div>
            </TrendingMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos

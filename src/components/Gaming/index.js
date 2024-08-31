import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
// import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import SideNavBar from '../SideNavBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  GamingVideosSerchContainer,
  ErrorHeading,
  GamingMainContainer,
  GamingTopSection,
} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  renderSuccesView = allVideos => {
    this.setState({
      videosList: allVideos,
      apiStatus: apiStatusConstants.success,
    })
  }

  getModifiedData = eachData => ({
    id: eachData.id,
    thumbnailUrl: eachData.thumbnail_url,
    title: eachData.title,
    viewCount: eachData.view_count,
  })

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const modifiedData = data.videos.map(eachData =>
        this.getModifiedData(eachData),
      )

      this.renderSuccesView(modifiedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingVideos = (lightTheme, onClickLogo) => {
    const {videosList} = this.state
    return (
      <div className="content-container">
        <GamingVideosSerchContainer lightTheme={lightTheme}>
          <GamingTopSection
            className="gaming-top-section"
            lightTheme={lightTheme}
          >
            <img
              src="https://wallpapers.com/images/featured/youtube-gaming-logo-png-f4e4cf8u5ljgpjz3.jpg"
              alt="gaming"
              className="gaming-img"
            />
            <h1 className="gaming-heading">Gamming</h1>
          </GamingTopSection>
          <ul className="gaming-videos-container">
            {videosList.map(eachVideo => (
              <Link
                to={`videos/${eachVideo.id}`}
                className="link-ele"
                key={eachVideo.id}
                onClick={onClickLogo}
              >
                <GamingMainContainer lightTheme={lightTheme}>
                  <li className="gaming-item" key={eachVideo.id}>
                    <img
                      src={eachVideo.thumbnailUrl}
                      alt={eachVideo.title}
                      className="gaming-item-img"
                    />
                    <h1 className="video-title">{eachVideo.title}</h1>
                    <div className="gaming-text-container">
                      <p className="item-text">
                        {eachVideo.viewCount} Watching
                      </p>
                      <p className="item-text">Worldwide</p>
                    </div>
                  </li>
                </GamingMainContainer>
              </Link>
            ))}
          </ul>
        </GamingVideosSerchContainer>
      </div>
    )
  }

  renderFailureView = lightTheme => {
    const failureImg = lightTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <GamingVideosSerchContainer
        lightTheme={lightTheme}
        className="loading-container"
      >
        <img src={failureImg} alt="not found" className="failed-img" />
        <ErrorHeading lightTheme={lightTheme} className="error-heading">
          Oops! Something Went Wrong
        </ErrorHeading>
        <p className="error-dic">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button
          type="button"
          className="error-btn"
          onClick={this.getGamingVideos}
        >
          Retry
        </button>
      </GamingVideosSerchContainer>
    )
  }

  renderLoadingView = lightTheme => (
    <GamingVideosSerchContainer
      lightTheme={lightTheme}
      className="loading-container"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </GamingVideosSerchContainer>
  )

  renderResult = (lightTheme, onClickLogo) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos(lightTheme, onClickLogo)
      case apiStatusConstants.failure:
        return this.renderFailureView(lightTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView(lightTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme, onChangeActiveNav} = value
          const onClickLogo = () => {
            onChangeActiveNav('')
          }

          return (
            <GamingMainContainer
              className="gaming-main-container"
              lightTheme={lightTheme}
            >
              <Header />
              <div className="gaming-container">
                <SideNavBar device="lg" />
                {this.renderResult(lightTheme, onClickLogo)}
              </div>
            </GamingMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending

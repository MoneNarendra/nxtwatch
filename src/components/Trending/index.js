import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
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
    this.getTrendingViews()
  }

  renderSuccesView = allVideos => {
    this.setState({
      videosList: allVideos,
      apiStatus: apiStatusConstants.success,
    })
  }

  modifiedChannelData = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  getModifiedData = eachData => ({
    channel: this.modifiedChannelData(eachData.channel),
    publishedAt: eachData.published_at,
    thumbnailUrl: eachData.thumbnail_url,
    title: eachData.title,
    viewCount: eachData.view_count,
    id: eachData.id,
  })

  getTrendingViews = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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

  renderFailureView = lightTheme => {
    const failureImg = lightTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <TrendingVideosSerchContainer
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
          onClick={this.getTrendingViews}
        >
          Retry
        </button>
      </TrendingVideosSerchContainer>
    )
  }

  renderLoadingView = lightTheme => (
    <TrendingVideosSerchContainer
      lightTheme={lightTheme}
      className="loading-container"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </TrendingVideosSerchContainer>
  )

  renderTrendingVideos = (lightTheme, onClickLogo) => {
    const {videosList} = this.state
    return (
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
            <h1 className="trending-heading">Trending</h1>
          </TrendingTopSection>
          <ul className="trending-videos-container">
            {videosList.map(eachVideo =>
              this.eachVideoElement(eachVideo, onClickLogo, lightTheme),
            )}
          </ul>
        </TrendingVideosSerchContainer>
      </div>
    )
  }

  renderResult = (lightTheme, onClickLogo) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos(lightTheme, onClickLogo)
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
            <TrendingMainContainer
              className="trending-main-container"
              lightTheme={lightTheme}
            >
              <Header />
              <div className="trending-container">
                <SideNavBar device="lg" />
                {this.renderResult(lightTheme, onClickLogo)}
              </div>
            </TrendingMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending

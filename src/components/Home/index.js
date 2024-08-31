import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {IoSearchOutline} from 'react-icons/io5'

import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

import Header from '../Header'
import SideNavBar from '../SideNavBar'
import Banner from '../Banner'

import {
  HomeVideosSerchContainer,
  SerchContainer,
  SerchEle,
  SerchBtn,
  VideoBottomText,
  ErrorHeading,
  VideosContainer,
  FailureContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    showBanner: true,
    onSerach: '',
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVides()
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
    id: eachData.id,
    channel: this.modifiedChannelData(eachData.channel),
    publishedAt: eachData.published_at,
    thumbnailUrl: eachData.thumbnail_url,
    title: eachData.title,
    viewCount: eachData.view_count,
  })

  getHomeVides = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {onSerach} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${onSerach}`
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

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  onChangeSearch = event => {
    this.setState({onSerach: event.target.value})
  }

  enterSearch = event => {
    if (event.keyCode === 13) {
      this.getHomeVides()
    }
  }

  renderSearchContainer = lightTheme => {
    const {onSerach} = this.state
    return (
      <SerchContainer>
        <SerchEle
          lightTheme={lightTheme}
          type="serch"
          placeholder="Search"
          className="serch-ele"
          onChange={this.onChangeSearch}
          value={onSerach}
          onKeyDown={this.enterSearch}
        />
        <SerchBtn
          type="button"
          lightTheme={lightTheme}
          onClick={this.getHomeVides}
        >
          <IoSearchOutline className="search-image" />
        </SerchBtn>
      </SerchContainer>
    )
  }

  renderLoadingView = () => {
    const {showBanner} = this.state
    return (
      <FailureContainer
        showBanner={showBanner}
        className="videos-container loader-container"
      >
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </FailureContainer>
    )
  }

  renderNoVideos = lightTheme => {
    const {showBanner} = this.state
    return (
      <FailureContainer
        showBanner={showBanner}
        className="videos-container failure-container"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failed-img"
        />
        <ErrorHeading className="error-heading" lightTheme={lightTheme}>
          No Search results found
        </ErrorHeading>
        <p className="error-dic">
          Try different key words or remove search filter
        </p>
        <button type="button" className="error-btn" onClick={this.getHomeVides}>
          Retry
        </button>
      </FailureContainer>
    )
  }

  renderVideos = (lightTheme, onClickLogo) => {
    const {videosList, showBanner} = this.state

    return videosList.length > 0 ? (
      <VideosContainer className="videos-container" showBanner={showBanner}>
        {videosList.map(eachVideo => (
          <Link
            to={`videos/${eachVideo.id}`}
            className="link-ele"
            key={eachVideo.id}
            onClick={onClickLogo}
          >
            <li className="video-item" key={eachVideo.id}>
              <img
                src={eachVideo.thumbnailUrl}
                alt={eachVideo.channel.name}
                className="video-thumbnail"
              />
              <div className="video-bottom-container">
                <img
                  src={eachVideo.channel.profileImageUrl}
                  className="channel-img"
                  alt={eachVideo.channel.name}
                />
                <VideoBottomText lightTheme={lightTheme}>
                  <h1 className="home-video-name">{eachVideo.title}</h1>
                  <div className="text-container-bottom">
                    <p className="video-details-text">
                      {eachVideo.channel.name}
                    </p>
                    <p className="video-details-text">{eachVideo.viewCount}</p>
                    <p className="video-details-text">
                      {formatDistanceToNow(
                        new Date(eachVideo.publishedAt),
                      ).slice(5)}
                      {` `}
                      ago
                    </p>
                  </div>
                </VideoBottomText>
              </div>
            </li>
          </Link>
        ))}
      </VideosContainer>
    ) : (
      this.renderNoVideos(lightTheme)
    )
  }

  renderFailureView = lightTheme => {
    const {showBanner} = this.state
    const failureImg = lightTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <FailureContainer
        showBanner={showBanner}
        className="videos-container failure-container"
      >
        <img src={failureImg} alt="not found" className="failed-img" />
        <ErrorHeading lightTheme={lightTheme} className="error-heading">
          Oops! Something Went Wrong
        </ErrorHeading>
        <p className="error-dic">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button" className="error-btn" onClick={this.getHomeVides}>
          Retry
        </button>
      </FailureContainer>
    )
  }

  renderAllVideos = (lightTheme, onClickLogo) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideos(lightTheme, onClickLogo)
      case apiStatusConstants.failure:
        return this.renderFailureView(lightTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {showBanner} = this.state
          const {lightTheme, onChangeActiveNav} = value
          const onClickLogo = () => {
            onChangeActiveNav('')
          }
          return (
            <div className="home-main-container">
              <Header />
              <div className="home-container">
                <SideNavBar device="lg" />
                <div className="content-container">
                  {showBanner && <Banner removeBanner={this.removeBanner} />}
                  <HomeVideosSerchContainer lightTheme={lightTheme}>
                    {this.renderSearchContainer(lightTheme)}
                    {this.renderAllVideos(lightTheme, onClickLogo)}
                  </HomeVideosSerchContainer>
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home

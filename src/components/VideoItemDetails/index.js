import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player/lazy'

import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import SideNavBar from '../SideNavBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  VideoDetailsContainer,
  ErrorHeading,
  TrendingMainContainer,
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
    videoDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  renderSuccesView = videoDetails => {
    this.setState({
      videoDetailsList: videoDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  modifiedChannelData = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
    subscriberCount: channel.subscriber_count,
  })

  getModifiedData = eachData => ({
    id: eachData.id,
    channel: this.modifiedChannelData(eachData.channel),
    publishedAt: eachData.published_at,
    thumbnailUrl: eachData.thumbnail_url,
    title: eachData.title,
    viewCount: eachData.view_count,
    videoUrl: eachData.video_url,
    description: eachData.description,
  })

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const videoDetails = data.video_details

      const modifiedData = this.getModifiedData(videoDetails)

      this.renderSuccesView(modifiedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = lightTheme => {
    const failureImg = lightTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <VideoDetailsContainer
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
          onClick={this.getVideoDetails}
        >
          Retry
        </button>
      </VideoDetailsContainer>
    )
  }

  renderLoadingView = lightTheme => (
    <VideoDetailsContainer
      lightTheme={lightTheme}
      className="loading-container"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </VideoDetailsContainer>
  )

  addLikeStatus = (videoId, likeDisLikeVideos, addLikeDisLikeVideos) => {
    const findingVideo = likeDisLikeVideos.find(
      eachVideo => eachVideo.id === videoId,
    )

    if (findingVideo === undefined) {
      const videoObj = {id: videoId, videoStatus: 'Liked'}
      const newList = [...likeDisLikeVideos, videoObj]
      addLikeDisLikeVideos(newList)
    } else if (findingVideo.videoStatus === 'Liked') {
      const newList = likeDisLikeVideos.map(eachVideo => {
        if (eachVideo.id === videoId) {
          return {...eachVideo, videoStatus: ''}
        }
        return eachVideo
      })
      addLikeDisLikeVideos(newList)
    } else {
      const newList = likeDisLikeVideos.map(eachVideo => {
        if (eachVideo.id === videoId) {
          return {...eachVideo, videoStatus: 'Liked'}
        }
        return eachVideo
      })
      addLikeDisLikeVideos(newList)
    }
  }

  addDislikeStatus = (videoId, likeDisLikeVideos, addLikeDisLikeVideos) => {
    const findingVideo = likeDisLikeVideos.find(
      eachVideo => eachVideo.id === videoId,
    )

    if (findingVideo === undefined) {
      const videoObj = {id: videoId, videoStatus: 'Dislike'}
      const newList = [...likeDisLikeVideos, videoObj]
      addLikeDisLikeVideos(newList)
    } else if (findingVideo.videoStatus === 'Dislike') {
      const newList = likeDisLikeVideos.map(eachVideo => {
        if (eachVideo.id === videoId) {
          return {...eachVideo, videoStatus: ''}
        }
        return eachVideo
      })
      addLikeDisLikeVideos(newList)
    } else {
      const newList = likeDisLikeVideos.map(eachVideo => {
        if (eachVideo.id === videoId) {
          return {...eachVideo, videoStatus: 'Dislike'}
        }
        return eachVideo
      })
      addLikeDisLikeVideos(newList)
    }
  }

  addSaveStatus = (videoDetailsList, savedVideos, saveVideo) => {
    const findingVideo = savedVideos.find(
      eachVideo => eachVideo.id === videoDetailsList.id,
    )
    if (findingVideo === undefined) {
      const newList = [...savedVideos, videoDetailsList]
      saveVideo(newList)
    } else {
      const newList = savedVideos.filter(
        eachVideo => eachVideo.id !== videoDetailsList.id,
      )
      saveVideo(newList)
    }
    // saveVideo()
  }

  renderAllVideoDetails = (
    lightTheme,
    likeDisLikeVideos,
    addLikeDisLikeVideos,
    savedVideos,
    saveVideo,
  ) => {
    const {videoDetailsList} = this.state
    const likedVideo = () => {
      this.addLikeStatus(
        videoDetailsList.id,
        likeDisLikeVideos,
        addLikeDisLikeVideos,
      )
    }

    const disLikedVideo = () => {
      this.addDislikeStatus(
        videoDetailsList.id,
        likeDisLikeVideos,
        addLikeDisLikeVideos,
      )
    }

    const onClickSaveVideo = () => {
      this.addSaveStatus(videoDetailsList, savedVideos, saveVideo)
    }

    const findingVideo = likeDisLikeVideos.find(
      eachVideo => eachVideo.id === videoDetailsList.id,
    )

    let likeClass = ''
    let dislikeClass = ''
    if (findingVideo !== undefined) {
      likeClass = findingVideo.videoStatus === 'Liked' && 'acive-btn'
      dislikeClass = findingVideo.videoStatus === 'Dislike' && 'acive-btn'
    }

    const findingSavedVideo = savedVideos.find(
      eachVideo => eachVideo.id === videoDetailsList.id,
    )
    const saveClass = findingSavedVideo !== undefined && 'acive-btn'

    // console.log(likeDisLikeVideos)
    // console.log(savedVideos)

    return (
      <div className="content-container">
        <VideoDetailsContainer lightTheme={lightTheme}>
          <div className="player-wrapper">
            <ReactPlayer
              url={videoDetailsList.videoUrl}
              controls
              width="100%"
              height="100%"
              className="react-player"
            />
          </div>
          <div className="video-details-bottom">
            <h1 className="video-name">{videoDetailsList.title}</h1>
          </div>
          <div className="video-details-top-text-container">
            <ul className="vidoe-details-views-publish-continaet">
              <li>
                <p className="views-publish-text">
                  {videoDetailsList.viewCount} views
                </p>
              </li>
              <li>
                <p className="views-publish-text">
                  {formatDistanceToNow(new Date(videoDetailsList.publishedAt))
                    .split(' ')
                    .splice(1)}{' '}
                  ago
                </p>
              </li>
            </ul>
            <div className="rection-btns-container">
              <button
                type="button"
                className={`btn-icon ${likeClass}`}
                onClick={likedVideo}
              >
                <BiLike className="video-details-icon" /> Like
              </button>
              <button
                type="button"
                className={`btn-icon ${dislikeClass}`}
                onClick={disLikedVideo}
              >
                <BiDislike className="video-details-icon" /> Dislike
              </button>
              <button
                type="button"
                className={`btn-icon ${saveClass}`}
                onClick={onClickSaveVideo}
              >
                <BiListPlus className="video-details-icon" /> Save
              </button>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="channel-container">
            <img
              src={videoDetailsList.channel.profileImageUrl}
              alt={videoDetailsList.channel.name}
              className="channel-logo"
            />
            <div className="channel-text-container">
              <h1 className="channel-name">{videoDetailsList.channel.name}</h1>
              <p className="channel-subs">
                {videoDetailsList.channel.subscriberCount} subscribers
              </p>
            </div>
          </div>
          <p className="discription">{videoDetailsList.description}</p>
        </VideoDetailsContainer>
      </div>
    )
  }

  renderResult = (
    lightTheme,
    likeDisLikeVideos,
    addLikeDisLikeVideos,
    savedVideos,
    saveVideo,
  ) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllVideoDetails(
          lightTheme,
          likeDisLikeVideos,
          addLikeDisLikeVideos,
          savedVideos,
          saveVideo,
        )
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
          const {
            lightTheme,
            likeDisLikeVideos,
            addLikeDisLikeVideos,
            savedVideos,
            saveVideo,
          } = value

          return (
            <TrendingMainContainer
              className="trending-main-container"
              lightTheme={lightTheme}
            >
              <Header />
              <div className="trending-container">
                <SideNavBar device="lg" />
                {this.renderResult(
                  lightTheme,
                  likeDisLikeVideos,
                  addLikeDisLikeVideos,
                  savedVideos,
                  saveVideo,
                )}
              </div>
            </TrendingMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending

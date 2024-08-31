import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'

import ProtectedRoute from './components/ProtectedRoute'

import NxtWatchContext from './context/NxtWatchContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    lightTheme: true,
    activeCom: '/',
    likeDisLikeVideos: [],
    savedVideos: [],
  }

  // componentDidMount() {
  //   // const {match} = this.props
  //   // const {params} = match
  //   this.setState({activeCom: window.location.pathname})
  //   // this.setState({activeCom: params.id})
  // }

  onChangeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  onChangeActiveNav = id => {
    this.setState({activeCom: id})
  }

  addLikeDisLikeVideos = newList => {
    // const {likeDisLikeVideos} = this.state
    this.setState({likeDisLikeVideos: [...newList]})
  }

  saveVideo = newList => {
    // const {likeDisLikeVideos} = this.state
    this.setState({savedVideos: [...newList]})
  }

  render() {
    const {lightTheme, activeCom, likeDisLikeVideos, savedVideos} = this.state

    return (
      <NxtWatchContext.Provider
        value={{
          lightTheme,
          onChangeTheme: this.onChangeTheme,
          activeCom,
          onChangeActiveNav: this.onChangeActiveNav,
          likeDisLikeVideos,
          addLikeDisLikeVideos: this.addLikeDisLikeVideos,
          savedVideos,
          saveVideo: this.saveVideo,
        }}
      >
        <Switch>
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App

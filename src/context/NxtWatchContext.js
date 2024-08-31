import React from 'react'

const NxtWatchContext = React.createContext({
  lightTheme: true,
  onChangeTheme: () => {},
  activeCom: '',
  onChangeActiveNav: () => {},
  likeDisLikeVideos: [],
  addLikeDisLikeVideos: () => {},
  savedVideos: [],
  saveVideo: () => {},
})

export default NxtWatchContext

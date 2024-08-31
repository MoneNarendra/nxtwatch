import './index.css'

const Banner = props => {
  const {removeBanner} = props

  const onClickRemoveBanner = () => {
    removeBanner()
  }
  return (
    <div className="home-top-card">
      <div className="top-card-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="home-card-img"
        />
        <p className="banner-discription">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="get-button">
          GET IT NOW
        </button>
      </div>
      <div className="top-card-right">
        <button
          type="button"
          className="cancel-button"
          onClick={onClickRemoveBanner}
        >
          &#10006;
        </button>
      </div>
    </div>
  )
}

export default Banner

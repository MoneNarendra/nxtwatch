import {Component} from 'react'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  LoginBgContainer,
  LoginMainContainer,
  LabelEle,
  InputEle,
  CheckBoxLabel,
} from './styledComponents'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showPassword: false, errorStatus: false}

  onChangeValue = event => {
    const {value, name} = event.target
    this.setState({[name]: value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  loginFailure = msg => {
    this.setState({errorMsg: msg, errorStatus: true})
  }

  loginSuccessfull = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccessfull(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, errorStatus, errorMsg} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value

          return (
            <LoginBgContainer lightTheme={lightTheme}>
              <LoginMainContainer lightTheme={lightTheme}>
                <img
                  src={
                    lightTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="nxt watch logo"
                  className="log-img"
                />
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  <LabelEle htmlFor="username" lightTheme={lightTheme}>
                    USERNAME
                  </LabelEle>
                  <InputEle
                    lightTheme={lightTheme}
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={this.onChangeValue}
                    placeholder="Username"
                  />
                  <LabelEle htmlFor="password" lightTheme={lightTheme}>
                    PASSWORD
                  </LabelEle>

                  <InputEle
                    lightTheme={lightTheme}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.onChangeValue}
                    placeholder="Password"
                  />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="showpassword"
                      className="checkbox-ele"
                      value={showPassword}
                      onChange={this.onChangeShowPassword}
                    />
                    <CheckBoxLabel
                      htmlFor="showpassword"
                      lightTheme={lightTheme}
                    >
                      Show Password
                    </CheckBoxLabel>
                  </div>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  {errorStatus && <p className="error-msg">*{errorMsg}</p>}
                </form>
              </LoginMainContainer>
            </LoginBgContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default LoginForm

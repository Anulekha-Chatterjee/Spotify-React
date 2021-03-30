import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import Search from "./Search";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Theme.js";

const spotifyWebApi = new Spotify();

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

class App extends Component {
  constructor() {
    super();
    const param = this.getHashParams();
    this.state = {
      loggedIn: param.access_token ? true : false,
      theme: "light",
    };

    if (param.access_token) {
      spotifyWebApi.setAccessToken(param.access_token);
      console.log(param.access_token);
    }
  }

  themeToggler() {
    this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <GlobalStyles />
        <StyledApp>
          <div className="App">
          <label class="switch">
            <input type="checkbox" onClick={() => this.themeToggler()}/>
            <span class="slider round"></span>
            </label>
            <button>
              {" "}
              <a href="http://localhost:8888">Login with Spotify </a>
            </button>

            <Search />
          </div>
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;

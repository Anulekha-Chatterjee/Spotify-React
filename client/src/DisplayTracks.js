import React, { Component } from "react";
import "./App.css";

class DisplayTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false,
    };
  }
  playAudio(previewUrl) {
    console.log (previewUrl)
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio,
      });
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false,
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio,
        });
      }
    }
  }
  render() {
    const { tracks } = this.props;
    return (
      <div>
        <h1> Tracks:</h1> 
        {tracks.map((track, index) => {
          const trackImg = track.album.images[0].url;
          return (
            <div key={index} className="track">
              <img src={trackImg} className="track-img" alt="track" onClick={()=>{this.playAudio (track.preview_url)} }/>
              <p className="track-text">{track.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayTracks;

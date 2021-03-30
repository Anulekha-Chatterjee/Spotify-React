import React, { Component } from 'react';
import './App.css';

class PlayTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
          }
    }
    render() {
        return(<div>this is where preview track will go</div>)
    }
}
export default PlayTrack;
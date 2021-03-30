import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import './App.css';
import DisplayTracks from './DisplayTracks';
import RelatedArtists from './RelatedArtists';
import PlayTrack from './PlayTrack';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Search extends Component{
  constructor(props){
    super(props);
    const param = this.getHashParams();
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      related_artists: []
    }
    if (param.access_token)
    {
     spotifyWebApi.setAccessToken(param.access_token)
    }
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

  searchTrackByArtist(query){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${spotifyWebApi.getAccessToken()}`);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${!query ? this.state.query: query}&type=artist&limit=10`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`;
    fetch(FETCH_URL, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist})
      console.log (this.state.artist)
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(json => {
        const {tracks} = json;
        this.setState({tracks});
      })
      .then (this.getRelatedArtists())
    })
    }
  
    getRelatedArtists(){
      console.log (this.state.artist)
      if(this.state.artist !== null){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${spotifyWebApi.getAccessToken()}`);
        const BASE_URL = 'https://api.spotify.com/v1/artists/';
        let FETCH_URL = `${BASE_URL}${this.state.artist.id}/related-artists`
        fetch(FETCH_URL, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {this.setState({related_artists: result.artists})
      })
      }
    }
  


  render(){
    return (
      <div className="app">
        <div className="app-title">Search By Artist </div>
        <Form>
          <input
            type="text"
            placeholder="Search for an artist"
            value={this.state.query}
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.searchTrackByArtist();
              }
            }}
          />
        </Form>
        {
          <div>
            <PlayTrack/>
         <DisplayTracks tracks={this.state.tracks} />
            <RelatedArtists related_artists= {this.state.related_artists}></RelatedArtists>
            
          </div>
        }
      </div>
    );
  }
}
export default Search;
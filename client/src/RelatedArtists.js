import React, {useState } from 'react';
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import './App.css';

const RelatedArtists = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState ('');
    const [genre, setGenre] = useState ([]);
    const [followers, setFollowers] = useState (0);

    const handleClose = () => setShow(false);
    const handleShow = value => {setShow(true);
    setTitle (value.name)
    setGenre (value.genres)
    setFollowers (value.followers)
    }
  return (
    <div>
      <h1>Related Artists:</h1>
      <div>
        {props.related_artists.map((artist, index) => {
          return (
            <div key={index} className="track">
              <img
                src={artist.images[0].url}
                className="track-img"
                value = {artist.name}
                onClick={() => handleShow(artist)}
              />
              <p className="artist-name">{artist.name}</p>
            </div>
          );
         
        })}
            <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="profile">
          <div className='profile-followers'>Followers: {followers.total}</div>
          <div className='profile-genres'>
            Genres:
            {genre.map ((item, key)=>{return (<span key={key}> {(key ? ', ' : '') + item}</span>)})}
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default RelatedArtists;
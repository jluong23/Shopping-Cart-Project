// DailySong.js

import React, { Component, useEffect, useState } from "react";
import SpotifyAPIHelper from "../SpotifyAPIHelper";
import Button from 'react-bootstrap/Button';
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'
import moment from "moment";
const DailySong = (props) => {
  const NUM_TRACKS = 8;
  const artistId = "0hEurMDQu99nJRq8pTxO14"; //artist id on spotify for John Mayer
  // const artistId = "776Uo845nYHJpNaStv1Ds4"; //artist id on spotify for Hendrix
  // const artistId = "6zlR5ttMfMNmwf2lecU9Cc"; //artist id on spotify for Sam Fender
  
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [spotifyApiHelper, setSpotifyApiHelper] = useState(
    new SpotifyAPIHelper(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET, artistId)
  );
  const [showPreviousTrackButton, setShowPreviousTrackButton] = useState(true);
  const [showNextTrackButton, setShowNextTrackButton] = useState(false);
  const [endOfDay, setEndOfDay] = useState(moment().endOf('day'));
  const [timeUntilEndOfDay, setTimeUntilEndOfDay] = useState("99:99:99");

  const createSeedsByDate = () => {
    // create seeds for each track. 
    // Last element will be todays date.
    // First element will be todays date - NUM_TRACKS number of days.
    let seeds = [];
    let today = moment();
    for (let i = 0; i < NUM_TRACKS; i++) {
      seeds[i] = today.clone().subtract(NUM_TRACKS-i, "days").format('L');
    }
    return seeds;
  }
  const loadTracks = () => {
    // load random tracks which are unique
    spotifyApiHelper.getRandomTracks(NUM_TRACKS, createSeedsByDate(NUM_TRACKS)).then((result) => {
      setTracks(result);
      // set current track to last element in tracks
      setCurrentTrack(result[result.length-1])
    });
  };

  useEffect(() => {
    spotifyApiHelper.setClientCredentialsToken().then(() => {
      // set the client credentials token for api calls, then set daily track with today's date
      loadTracks();

      // TOOD: example usage for getRandomTracks, need to implement with correct seeds.
    });
    const interval = setInterval(() => {
      let diff = endOfDay.diff(moment());
      if(diff < 0){
        // countdown has finished, change endOfDay to next day (reset)
        // add 1 minute to ensure next day is set correctly
        setEndOfDay(moment().add(10, 'minute').endOf('day'));
      }
      setTimeUntilEndOfDay(moment(diff).format('HH:mm:ss'));
      
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    }
  }, []);

  /**
   * hide buttons if at min or max dates, preventing date to exceed boundary. Else show both buttons.
   * @param {*} changeInDays - Number of days / index to change by
   */
  const changeTrackButtonClicked = (changeInDays) => {
      // change current track
      let newIndex = tracks.indexOf(currentTrack) + changeInDays;
      setCurrentTrack(tracks[newIndex]);
      if(newIndex == 0){
        // min boundary, don't show previous track button
        setShowPreviousTrackButton(false);
        setShowNextTrackButton(true);
      }else if(newIndex == tracks.length - 1){
        // max boundary, don't show next track button
        setShowPreviousTrackButton(true);
        setShowNextTrackButton(false);
      }else{
        setShowPreviousTrackButton(true);
        setShowNextTrackButton(true);
      }
    }
  
  
  const errorMsg = (<p>Could not fetch the daily song...</p>)
  // last index of tracks is today's date (subtract 0 days)
  let currentDate = moment().subtract(tracks.length-1-tracks.indexOf(currentTrack), "days");
  const dailySongContent = currentTrack && (
    <div id="daily-song-content">
      <h3>{currentDate.format('dddd MMMM Do YYYY')}</h3>
      <p>New song in {timeUntilEndOfDay}</p>
      <div id="daily-song-top">
        <span className="change-song-icon">
          {showPreviousTrackButton && <BsFillArrowLeftCircleFill onClick={() => {changeTrackButtonClicked(-1)}}/>}
        </span>
          <div id="daily-song-image">
            <img src={currentTrack.image}/>
          </div>
        <span className="change-song-icon">
          {showNextTrackButton && <BsFillArrowRightCircleFill onClick={() => {changeTrackButtonClicked(+1)}}/>}
        </span>
      </div>
      <p>{currentTrack.name}</p>
      <p>Album: {currentTrack.album_name}</p>
      <a href={currentTrack.uri} target="_blank" rel="noreferrer">
        <Button size="lg">Listen on Spotify!</Button>
      </a>
    </div>
  )
  return (
    <div id="daily-song">
      <h1>Daily Song</h1>
      <div id="daily-song-wrapper">
        {currentTrack ? dailySongContent : errorMsg}
      </div>
    </div>
  );
};

export default DailySong;
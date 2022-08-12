// DailySong.js

import React, { Component, useEffect, useState } from "react";
import SpotifyAPIHelper from "../SpotifyAPIHelper";
import Button from 'react-bootstrap/Button';
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'
import moment from "moment";
const DailySong = (props) => {
  // const artistId = "0hEurMDQu99nJRq8pTxO14"; //artist id on spotify for John Mayer
  const artistId = "776Uo845nYHJpNaStv1Ds4"; //artist id on spotify for Hendrix
  // const artistId = "6zlR5ttMfMNmwf2lecU9Cc"; //artist id on spotify for Sam Fender

  let [dailySong, setDailySong] = useState(null);
  let [dailyAlbum, setDailyAlbum] = useState(null);
  let [currentDate, setCurrentDate] = useState(moment());
  const [spotifyApiHelper, setSpotifyApiHelper] = useState(
    new SpotifyAPIHelper(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET, artistId)
  );
  const [showNextTrackButton, setShowNextTrackButton] = useState(false);
  const [showPreviousTrackButton, setShowPreviousTrackButton] = useState(true);
  

  const setDailyTrack = (date) => {
    spotifyApiHelper.getDailyTrack(date).then((result) => {
      setDailySong(result.track);
      setDailyAlbum(result.album);
    });
  };

  useEffect(() => {
    spotifyApiHelper.setClientCredentialsToken().then(() => {
      // set the client credentials token for api calls, then set daily track with today's date
      setDailyTrack(currentDate);
    });
  }, []);

  // number of days to change by
  const changeTrackButtonClicked = (days) => {
    let newDate = currentDate.clone().add(days, "days");
    let maxDate = moment();
    //subtract a minute for range to be slightly larger, being able to access the minimum day
    let minDate = maxDate.clone().subtract(7, 'days').subtract(1, 'minutes'); 
    if(newDate.isBefore(maxDate) && newDate.isSameOrAfter(minDate)){
      // within range
      setCurrentDate(newDate);
      setDailyTrack(newDate);
      // hide buttons if at min or max dates. Else show both buttons.
      if(newDate.format("MMM Do YY") == maxDate.format("MMM Do YY")){
        setShowPreviousTrackButton(true);
        setShowNextTrackButton(false);
      }else if(newDate.format("MMM Do YY") == minDate.format("MMM Do YY")){
        setShowPreviousTrackButton(false);
        setShowNextTrackButton(true);
      }else{
        setShowPreviousTrackButton(true);
        setShowNextTrackButton(true);
      }

    }
  }
  
  

  const errorMsg = (<p>Could not fetch the daily song...</p>)

  const dailySongContent = dailySong && (
    <div id="daily-song-content">
      <h3>{currentDate.format('dddd MMMM Do YYYY')}</h3>
      <div id="daily-song-top">
        <span className="change-song-icon">
          {showPreviousTrackButton && <BsFillArrowLeftCircleFill onClick={() => {changeTrackButtonClicked(-1)}}/>}
        </span>
          <div id="daily-song-image">
            <img src={dailyAlbum.image}/>
          </div>
        <span className="change-song-icon">
          {showNextTrackButton && <BsFillArrowRightCircleFill onClick={() => {changeTrackButtonClicked(+1)}}/>}
        </span>
      </div>
      <p>{dailySong.name}</p>
      <p>Album: {dailyAlbum.name}</p>
      <a href={dailySong.uri} target="_blank">
        <Button size="lg">Listen on Spotify!</Button>
      </a>
    </div>
  )
  return (
    <div id="daily-song">
      <h1>Daily Song</h1>
      <div id="daily-song-wrapper">
        {dailySong ? dailySongContent : errorMsg}
      </div>
    </div>
  );
};

export default DailySong;
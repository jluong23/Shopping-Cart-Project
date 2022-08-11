// DailySong.js

import React, { Component, useEffect, useState } from "react";
import SpotifyAPIHelper from "../SpotifyAPIHelper";
import Button from 'react-bootstrap/Button';


const DailySong = (props) => {
  let [dailySong, setDailySong] = useState(null);
  let [dailyAlbum, setDailyAlbum] = useState(null);
  // const customDate = new Date(2022,7,17) //used for testing, yy, m(index), dd
  // let [todayDate, setTodayDate] = useState(customDate);
  let [todayDate, setTodayDate] = useState(new Date());
  const artistId = "0hEurMDQu99nJRq8pTxO14"; //artist id on spotify for John Mayer
  
  useEffect(() => {
    let spotifyApiHelper = new SpotifyAPIHelper(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET, artistId);
      spotifyApiHelper.getDailyTrack(todayDate).then((result) => {
        setDailySong(result.track);
        setDailyAlbum(result.album);
      });
  }, []);

  const errorMsg = (<p>Could not fetch the daily song...</p>)

  const dailySongContent = dailySong && (
    <div id="daily-song-content">
      <h3>{todayDate.toDateString()}</h3>
      <div id="daily-song-image">
        <img src={dailyAlbum.image}/>
      </div>
      <p>{dailySong.name}</p>
      <p>Album: {dailyAlbum.name}</p>
      <a href={dailySong.url} target="_blank">
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
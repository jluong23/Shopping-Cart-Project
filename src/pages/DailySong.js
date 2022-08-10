// DailySong.js

import React, { Component, useEffect, useState } from "react";
import SpotifyAPIHelper from "../SpotifyAPIHelper";
import Button from 'react-bootstrap/Button';


const DailySong = ({apiToken, artistId}) => {
  let [dailySong, setDailySong] = useState(null);
  let [dailyAlbum, setDailyAlbum] = useState(null);
  useEffect(() => {
    if(apiToken){
      SpotifyAPIHelper.getDailyTrack(apiToken, artistId).then((result) => {
        setDailySong(result.track);
        setDailyAlbum(result.album);
      });
    }
  }, []);

  const loadingMsg = (<p>Fetching daily song...</p>)
  const dailySongContent = dailySong && (
    <div id="daily-song-content">
      <h3>{new Date().toDateString()}</h3>
      <div id="daily-song-image">
        <img src={dailyAlbum.image}/>
      </div>
      <p>Track: {dailySong.name}</p>
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
        {dailySong ? dailySongContent : loadingMsg}
      </div>
    </div>
  );
};

export default DailySong;
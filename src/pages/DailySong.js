// DailySong.js

import React, { Component } from "react";
import SpotifyAPIHelper from "../SpotifyAPIHelper";
const DailySong = ({apiToken, artistId}) => {
  if(apiToken){
    SpotifyAPIHelper.getDailyTrack(apiToken, artistId).then((result) => {
      console.log(result);
    });
  }

  return (
    <div>
      <h1>Daily Song</h1>
    </div>
  );
};

export default DailySong;
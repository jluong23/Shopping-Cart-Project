import {Buffer} from 'buffer';
import seedrandom from 'seedrandom';
class SpotifyAPIHelper{
  static TOKEN_URL = "https://accounts.spotify.com/api/token";
  static seedrandom = require('seedrandom');
  /**
   * Create a new SpotifyAPIHelper for an artist given API credentials.
   * You should run setClientCredentialsToken() after instantiating a SpotifyAPIHelper
   * to start using the API.
   * @param {string} clientId 
   * @param {string} clientSecret 
   * @param {string} artistId 
   */
  constructor(clientId, clientSecret, artistId){
    this.artistId = artistId;
    this.token = null; //token will need to be set
    if(!clientSecret){
      console.log("Missing API Client Secret...");
    };
    if(!clientId){
      console.log("Missing API Client Id...");
    }
    this.authorizationHeader = `${clientId}:${clientSecret}`
  }

  static generateRandomNumber(min, max, seed){
    let rng = this.seedrandom(seed);
    return Math.floor(rng.quick() * (max - min + 1)) + min;
  }

  /**
   * Used to format a query object into string.
   * A query is attached at the end of a request url.
   * eg. https://api.spotify.com/v1/artists/id/albums?limit=50%include_groups=album,
   * The query is after the '?'. 
   * @param {Object<string, string>} queryOptions 
   * @returns Formatted query string to be appended to url request.
   */

  static createQueryString(queryOptions){
    let query = Object.keys(queryOptions).map((key => {
      let value = queryOptions[key];
      return `${key}=${value}`;
    }));
    return query.join("&");
  }

  /**
   * Sets the token attribute, making a request to SpotifyAPIHelper.TOKEN_URL and including 
   * clientId and clientSecret values.
   */
  async setClientCredentialsToken(){
    const requestOptions = {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(this.authorizationHeader).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams(
        {grant_type: 'client_credentials'}
      )
    }
    let response = await fetch(SpotifyAPIHelper.TOKEN_URL, requestOptions)
    let token = await response.json();
    this.token = token;
  }
  
  // 
  /**
   * Using the set api token, function which makes a request to a URL.
   * @param {string} url 
   * @param {string} method - 'GET' or 'POST' 
   * @returns 
   */
  async createRestRequest(url, method){
    const requestOptions = {
      // works without access token??
      headers: {
        'Authorization': `${this.token.token_type} ${this.token.access_token}`
      },
      method: `${method}`,
    }
    let response = await fetch(url, requestOptions);
    let responseJson = await response.json();
    return responseJson;
  }


  /**
   * Returns a list of all album ids for the artistId attribute.
   * @returns 
   */
  async getAlbumIds(){
    const queryOptions = {
      "limit": "50", //max number of albums per request
      "include_groups": "album", //exclude singles, appears_on and compilation 
    }
    let query = SpotifyAPIHelper.createQueryString(queryOptions);
    const url = `https://api.spotify.com/v1/artists/${this.artistId}/albums?${query}`;
    let response = await this.createRestRequest(url, "GET");
    let albums = response.items;
    let albumIds = albums.map((album) => {
      return album.id;
    });
    return albumIds;
  }

  /**
   * Returns album objects given a list of album IDs.
   * @param {String[]} albumIds - strings
   * @returns
   */
  async getAlbums(albumIds){
    const ALBUM_LIMIT = 20;
    let albumBlocks = [];
    // 2d array where each subarray is of size ALBUM_LIMIT, containing album ids.
    for (let i = 0; i < albumIds.length; i += ALBUM_LIMIT){
      albumBlocks.push(albumIds.slice(i, i + ALBUM_LIMIT));
    }

    // convert album ids into album objects
    for (let i = 0; i < albumBlocks.length; i += 1){
      let idBlock = albumBlocks[i];
      let queryOptions = {
        "ids": idBlock.join(",")
      };
      let query = SpotifyAPIHelper.createQueryString(queryOptions);
      let url = `https://api.spotify.com/v1/albums?${query}`;
      let response = await this.createRestRequest(url, "GET");
      albumBlocks[i] = response.albums;            
    }

    // reduce 2d array of album objects into 1d array 
    let albums = albumBlocks.reduce((prev, next) => {
      return prev.concat(next);
    });
    return albums;
  }

  /**
   * Returns an object containing information for a random track given a seed.
   * @param {string} [seed]
   * @returns 
   */
  async getRandomTrack(seed){
    if(!seed){
      // generate a random number if seed was not given
      seed = seedrandom().quick();
    }
    // get the artist's albums
    let albumIds = await this.getAlbumIds();
    let albums = await this.getAlbums(albumIds);
    let album = albums[SpotifyAPIHelper.generateRandomNumber(0, albums.length-1, seed)]
    // select a track from the daily album using the same seed
    let tracks = album.tracks.items;
    let track = tracks[SpotifyAPIHelper.generateRandomNumber(0, tracks.length-1, seed)]
    let result = {
      "id": track.id,
      "name": track.name,
      "album_name": album.name,
      "url": track.external_urls.spotify,
      "uri": track.uri,
      "release_date": album.release_date,
      "image": album.images[0].url,
      "album_url": album.external_urls.spotify,
      "album_uri": album.uri,
    };
    return result;
  }

  /**
   * Get n random tracks for the set artistId attribute. 
   * @param {int} n - How many tracks to retrieve, should be the length of seeds if seeds are given.
   * @param {string[]} seeds - The seed used for each track.
   * @param {boolean} unique - Should all tracks be unique? No repeats.
   */
  async getRandomTracks(n, seeds = [], unique = true){
    if(!n || n == 0){
      return [];
    }else if(n == 1){
      return this.getRandomTrack(seeds[0]);
    }
    // typical case, n>1
    let tracks = [];
    let track;
    let trackIsUnique;
    for (let i = 0; i < n; i++) {
      let duplicatesFound = 0; //how many times the new track retrieved is a duplicate in tracks
      do{
        // by using duplicatesFound in the seed, the new song retrieved is deterministic
        let seed = `${seeds[i]}${duplicatesFound}`;
        track = await this.getRandomTrack(seed);
        // with unique=false, while loop is always false, break out and append track
        if(unique){
          // Append a new track (repeat) if this track already exists in tracks.
          trackIsUnique = true;
          if(this.containsTrack(tracks, track)){
            trackIsUnique = false;
            duplicatesFound++;
          }
        }
      }while(unique && !trackIsUnique);
      tracks[i] = track;
    }
    return tracks;
  }

  /**
   * Check if a list of tracks contains a given track
   * @param {*} tracks 
   * @param {*} track 
   * @returns 
   */
  containsTrack(tracks, track){
    if(tracks.length == 0){
      return false;
    }
    let trackIds = tracks.map((t) => {return t.id;})
    return trackIds.indexOf(track.id) > -1;
  }
}

export default SpotifyAPIHelper;
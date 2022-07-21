import {Buffer} from 'buffer';

class SpotifyAPIHelper{
    static getAuthorizationHeader(){
      return process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET;
    }

    static async createClientCredentialsToken(){
      let token = null;
        const requestOptions = {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(this.getAuthorizationHeader()).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          body: new URLSearchParams(
            {grant_type: 'client_credentials'}
          )
        }
        let url = 'https://accounts.spotify.com/api/token';
        let response = await fetch(url, requestOptions)
        token = await response.json();
        
        return token;
    }
    
      static async createRestRequest(url, method){
    
      }
}

export default SpotifyAPIHelper;
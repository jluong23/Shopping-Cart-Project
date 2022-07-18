import API_CREDENTIALS from "./api_credentials.json";
import {Buffer} from 'buffer';

class SpotifyAPIHelper{
    static async createClientCredentialsToken(){
        let token = null;
        if(API_CREDENTIALS){
          const requestOptions = {
            headers: {
              'Authorization': 'Basic ' + Buffer.from(API_CREDENTIALS.CLIENT_ID + ':' + API_CREDENTIALS.CLIENT_SECRET).toString('base64'),
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
        }else{
            console.error("API_CREDENTIALS does not exist...")
        }
        
        return token;
    }
    
      static async createRestRequest(url, method){
    
      }
}

export default SpotifyAPIHelper;
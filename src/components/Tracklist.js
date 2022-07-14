import React from 'react';
import trackLists from "../tracklists.json";

const Tracklist = (props) =>{

  //pass id of tracklist by props.id
  let id = props.id;
  let tracks = trackLists[id];
  
  return (
    <table className='product-tracklist'>
        <thead>
            <tr>
                <td>Title</td>
                <td>Duration</td>
            </tr>
        </thead>
        <tbody>
            {tracks.map((t) => {
                return (
                    <tr key={t["position"]}>    
                        <td>{t["title"]}</td>
                        <td>{t["duration"]}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  );
}

export default Tracklist;
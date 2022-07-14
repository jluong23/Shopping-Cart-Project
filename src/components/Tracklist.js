import React from 'react';
import trackLists from "../tracklists.json";
import Table from 'react-bootstrap/Table';

const Tracklist = (props) =>{

  //pass id of tracklist by props.id
  let id = props.id;
  let tracks = trackLists[id];
  
  return (
    <Table striped hover size='sm' className='product-tracklist'>
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
    </Table>
  );
}

export default Tracklist;
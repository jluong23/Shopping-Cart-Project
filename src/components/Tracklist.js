import React from 'react';
import trackLists from "../tracklists.json";
import Table from 'react-bootstrap/Table';

const Tracklist = (props) =>{

    //pass id of tracklist by props.id
    let id = props.id;
    let tracks = trackLists[id];
    let hasTrackDurations = tracks[0]["duration"] != null && tracks[0]["duration"] != "";

    let tableHead = (
        <thead>
            <tr>
                <th>Title</th>
                {hasTrackDurations ? <th>Duration</th> : null}
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {tracks.map((t) => {
                return (
                    <tr key={t["position"]}>    
                        <td>{t["title"]}</td>
                        {hasTrackDurations ? <td>{t["duration"]}</td> : null}
                    </tr>
                )
            })}
        </tbody>
    )

  return (
    <Table striped hover size='sm' className='product-tracklist'>
        {tableHead}
        {tableBody}
    </Table>
  );
}

export default Tracklist;
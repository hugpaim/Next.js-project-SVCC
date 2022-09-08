import Speaker from "./Speaker";
import { data } from "../../pages/SpeakerData";
import { useState, useEffect } from "react";
import ReactPlaceholder from 'react-placeholder';

function SpeakersList({showSessions }) {

  const [SpeakersData, setSpeakerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] =useState("");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

  useEffect(()=>{
      async function delayFunc(){
      try {
      await delay(2000);
      // throw "had error";
      setIsLoading(false);
      setSpeakerData(data);
    } catch(e) {
      setIsLoading(false);
      setHasErrored(true);
      setError(e);
    }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id){
    const speakerRecPrevious = SpeakersData.find(function(rec){
      return rec.id === id;
    });
    const speakerRecUpdated = {...speakerRecPrevious, favorite: !speakerRecPrevious.favorite};
    const speakersDataNew = SpeakersData.map(function(rec){
      return rec.id === id ? speakerRecUpdated: rec;
    });
    setSpeakerData(speakersDataNew);
  }

if(hasErrored === true){
  return(
    <div>
      ERROR: <b>Loading Speaker Data Failed {error}</b>
    </div>
  )
}

// if(isLoading===true) return <div>Loading...</div>

  return (
    <div className="container speakers-list">
    <ReactPlaceholder
    type="media"
    rows={15}
    className="speakerslist-placeholder"
    ready={isLoading===false}
    >
      <div className="row">
        {SpeakersData.map(function (speaker) {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSessions={showSessions}
              onFavoriteToggle={() =>{
                onFavoriteToggle(speaker.id);
              }}
            />
          );
        })}
        ;
      </div>
      </ReactPlaceholder>
    </div>
  );
}
export default SpeakersList;

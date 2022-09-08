import Speaker from "./Speaker";
import { data } from "../../pages/SpeakerData";
import { useState } from "react";

function SpeakersList({showSessions }) {

  const [SpeakersData, setSpeakerData] = useState(data);

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

  return (
    <div className="container speakers-list">
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
    </div>
  );
}
export default SpeakersList;

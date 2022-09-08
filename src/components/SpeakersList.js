import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder";
import useRequestDelay, {REQUEST_STATUS,} from "../hooks/useRequestDelay";
import {data} from "../../pages/SpeakerData";



function SpeakersList({ showSessions }) {
  const { data:SpeakersData, requestStatus, error, updateRecord } =
    useRequestDelay(2000, data);

  if (requestStatus===REQUEST_STATUS.FAILURE) {
    return (
      <div>
        ERROR: <b>Loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  // if(isLoading===true) return <div>Loading...</div>

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCESS}
      >
        <div className="row">
          {SpeakersData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => {
                  updateRecord({
                    ...speaker,favorite: !speaker.favorite,
                  });
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

import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder";
import useRequestSpeakers from "../hooks/useRequesSpeakers";

function SpeakersList({ showSessions }) {
  const { SpeakersData, isLoading, hasErrored, error, onFavoriteToggle } =
    useRequestSpeakers(2000);

  if (hasErrored === true) {
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
        ready={isLoading === false}
      >
        <div className="row">
          {SpeakersData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => {
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

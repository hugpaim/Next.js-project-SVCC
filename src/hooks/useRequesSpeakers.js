import { data } from "../../pages/SpeakerData";
import { useEffect, useState } from "react";

function useRequestSpeakers(delayTime = 1000) {
  const [SpeakersData, setSpeakerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        // throw "had error";
        setIsLoading(false);
        setSpeakerData(data);
      } catch (e) {
        setIsLoading(false);
        setHasErrored(true);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id) {
    const speakerRecPrevious = SpeakersData.find(function (rec) {
      return rec.id === id;
    });
    const speakerRecUpdated = {
      ...speakerRecPrevious,
      favorite: !speakerRecPrevious.favorite,
    };
    const speakersDataNew = SpeakersData.map(function (rec) {
      return rec.id === id ? speakerRecUpdated : rec;
    });
    setSpeakerData(speakersDataNew);
  }

  return{ SpeakersData, isLoading, hasErrored, error, onFavoriteToggle}
}
export default useRequestSpeakers;
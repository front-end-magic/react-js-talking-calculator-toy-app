import React from "react";

const Controls = ({ handleTalking, playSong, stopSong }) => {
  return (
    <div className="sounds-wrapper">
      <div className="sound talk" onClick={handleTalking}>
        talk
      </div>

      <div className="sound sing" onClick={playSong}>
        sing
      </div>
      <div className="sound stop" onClick={stopSong}>
        stop
      </div>
    </div>
  );
};

export default Controls;

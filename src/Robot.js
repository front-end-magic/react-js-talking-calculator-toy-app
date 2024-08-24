import "./my-calculator.css";
import "./robot.css";
import songsData from "./audioFiles.js";
import { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Calculator from "./Calculator.js";
import Controls from "./Controls.js";

const MyCalculator = () => {
  const [figure, setFigure] = useState("");
  const [result, setResult] = useState("");
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTalking, setIsTalking] = useState(true);
  const audioElem = useRef();
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const { speak, speaking, voices } = useSpeechSynthesis();

  const buttons = ["*", "/", "-", 7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "+"];
  const operators = ["/", "*", "+", "-", "."];
  const calculateValue = (value, speechValue) => {
    if (value === "/") {
      speechValue = "divide";
    } else if (value === "*") {
      speechValue = "times";
    } else if (value === ".") {
      speechValue = "point";
    } else if (value === "-") {
      speechValue = "minus";
    } else {
      speechValue = value;
    }
    try {
      if (
        (!operators.includes(figure.slice(-1)) && figure !== "") ||
        !operators.includes(value)
      ) {
        setFigure(figure + value);
        if (isTalking) {
          speak({
            text: speechValue,
            rate: 0.99,
          });
        }
        setResult(eval((figure + value).toString()));
      }
    } catch (error) {
      console.log(error);
      setResult("");
    }
  };

  const handleResult = () => {
    try {
      if (figure !== "" && !operators.includes(figure.slice(-1))) {
        setResult(eval(figure).toString());
        setFigure("");
        const speech = `${figure} equal to ${result}`;

        if (isTalking) {
          speak({
            text: speech,
            rate: 0.99,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setResult("Error");
      setFigure("");
      if (isTalking) {
        speak({ text: "error" });
      }
    }
  };
  const Allclear = () => {
    setResult("");
    setFigure("");
    speak({ text: "all clear" });
  };
  const deleteOne = () => {
    if (figure !== "") {
      const result = figure.slice(0, -1);
      setFigure(result);
      speak({ text: "delete last" });
    }
  };

  const playSong = () => {
    setIsPlaying(true);

    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    // audioElem.current.currentTime = 0;
  };
  const stopSong = () => {
    setIsPlaying(false);
  };
  const handleTalking = () => {
    setIsTalking(!isTalking);
    if (isTalking) {
      setResult("stop talking");
      speak({ text: "talking calculator deactivated" });
    } else {
      speak({ text: "talking calculator activated" });
    }
  };
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying, currentSong, isTalking]);

  const onPlaying = () => {
    if (
      audioElem.current.currentTime === audioElem.current.duration &&
      audioElem.current.duration >= 2
    ) {
      setIsPlaying(null);
    }
  };
  return (
    <>
      <audio
        ref={audioElem}
        src={currentSong.url}
        onTimeUpdate={onPlaying}
      ></audio>
      <div className="robot">
        <div className="robot-container">
          <div className="robot-wrapper">
            <div className="face-wrapper">
              <div className="face">
                <div
                  className={
                    isPlaying || speaking ? "singing-eye eyes" : "eyes"
                  }
                >
                  <div className="eye">
                    <div className="iris"></div>
                  </div>
                  <div className="eye">
                    <div className="iris"></div>
                  </div>
                </div>
                <div className="nose"></div>
                <div
                  className={
                    isPlaying || speaking ? "singing-mouth mouth" : "mouth"
                  }
                ></div>
              </div>
              <div className="ear ear1"></div>
              <div className="ear ear2"></div>
            </div>
            <div className="robot-body">
              <Controls
                playSong={playSong}
                stopSong={stopSong}
                handleTalking={handleTalking}
              />
              <Calculator
                buttons={buttons}
                result={result}
                figure={figure}
                calculateValue={calculateValue}
                handleResult={handleResult}
                Allclear={Allclear}
                deleteOne={deleteOne}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyCalculator;

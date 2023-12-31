import React, { Component,useState, useEffect } from 'react';
import "../helper/styles.css";
import WheelComponent from 'react-wheel-of-prizes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// function wheel
export default function Wheel() {
    const [score, setScore] = useState('');
    const [phrases, setPhrases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const navigateTo = useNavigate();
    //input
  const segments = [
    "1100",
    "1600",
    "1400",
    "200",
    "500",
    "800"
  ];
  //input
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  //const when we get winner
  const onFinished = (winner) => {
    console.log("Winner:",winner);
    localStorage.setItem("score",winner);
    setScore(winner);
    setShowConfetti(true);
  };
  // navigate function to next page
  function navigateToGame(){
    console.log("Phrase", phrases)
    const transformedArray = phrases.map((item) => item.phrase);
    localStorage.setItem("phrases", transformedArray);
    navigateTo("/game");
  }
  // call the url and fetch the data
  const fetchPhrasesByDifficulty = async (difficulty) => {
    try {
      const userResponse = await axios.get(`https://gamerecords-406318.uc.r.appspot.com/findByDifficulty?difficulty=${difficulty}`);
      ;
      setPhrases(userResponse.data);
      console.log("phrase set: ",userResponse.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhrasesByDifficulty(selectedDifficulty);
  }, [selectedDifficulty]);

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  //everything we need to return
  return (
    <>
    <div class="container-text-center">
    <h1>Spinning Your Wheel</h1>
    <div className ="spinning-wheel-container" >
    <div class="col-sm-8 align-items-center justify-content-center">
      <div className="WheelContainer">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      </div>
    </div>
    <div className="spin-result">
    {score != "" &&(
        <div>
          <div id = "confetti">
          {showConfetti && (
                    <>
                      {/* Add as many confetti elements as you want */}
                      <div className="confetti1" style={{ top: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti1" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                      {/* ... */}
                  
                    {/* Add as many confetti elements as you want */}
                    <div className="confetti1" style={{ top: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti1" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti1" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti2" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti3" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti4" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    <div className="confetti5" style={{ left: `${Math.random() * 100}vw` , top: `${Math.random() * 100}vh`}}></div>
                    {/* ... */}
                  </>
                  )}
          </div>
          <div id="spin-score" className={`score-display ${score !== "" ? "show-score" : ""}`}>
            <div>
            <h2>You got {score} points</h2>
            </div>
            <div id="difficulty-buttons">
              <p>Choose Difficulty:</p>
              <button onClick={() => handleDifficultyClick("easy")} className="btn btn-primary btn-lg">Easy</button>
              <button onClick={() => handleDifficultyClick("medium")} className="btn btn-primary btn-lg">Medium</button>
              <button onClick={() => handleDifficultyClick("hard")} className="btn btn-primary btn-lg">Hard</button>
            </div>
            <div></div>
            {selectedDifficulty && (
                  <div id="goodluck-button">
                    <button onClick={() => navigateToGame()} className="btn btn-primary btn-lg"> Good Luck </button>
                  </div>
                )}
          </div>
        </div>
      )
      }
    </div>
    </div>
   </div>
    </>
      );
}


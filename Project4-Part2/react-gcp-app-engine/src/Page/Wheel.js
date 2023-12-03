import React, { Component,useState, useEffect } from 'react';
import "../helper/styles.css";
import WheelComponent from 'react-wheel-of-prizes';
import { useNavigate } from 'react-router-dom';
import { fetchPhrases } from '../helper/phrase'; 


export default function Wheel() {
    const [score, setScore] = useState('');
    const [phrases, setPhrases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

const navigateTo = useNavigate();
  const segments = [
    "1000",
    "2000",
    "1200",
    "100",
    "500",
    "600"
  ];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log("Winner:",winner);
    localStorage.setItem("score",winner);
    
    
    setScore(winner);
  };

  function navigateToGame(){
    console.log("Phrase", phrases)
    const transformedArray = phrases.map((item) => item.phrase);
    localStorage.setItem("phrases", transformedArray);
    navigateTo("/game");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetchPhrases();
        setPhrases(userResponse.data);
        console.log("API: ",userResponse.data)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div class="container text-center">
    <h1>The Wheel of Fortune</h1>
  <div className ="row align-items-center justify-content-center" >
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
      </div></div>
    <div className="col-sm-4 align-items-center justify-content-center">
    {score != "" &&(
        <div>
        <h5>You got {score} points</h5>
        <button onClick = {() => navigateToGame()} className="btn btn-primary btn-lg"> Good Luck </button>
        </div>
      )
      }
    </div>
  </div>
  </div>
    </>
      );
}


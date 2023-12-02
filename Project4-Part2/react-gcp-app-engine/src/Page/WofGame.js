import React, { useState, useEffect } from 'react';
import {signOut, getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import { targetPhrases } from '../helper/Wof';
import { firebaseConfig } from '../helper/firebaseConfig';
import { displayAllGameRecord, displayGameRecord, saveGameRecord, deleteByUserId } from '../Services/GameRecordService';
import {displayAllUserRecord, saveUserRecord, updateUserRecord} from '../Services/UserRecordService';

  //randomly grab phrase 
  function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * targetPhrases.length);
    return targetPhrases[randomIndex];
  }
  //replace all letters to wilcard
  function replacePhraseWithAsterisks(phrase) {
    return phrase.replace(/[A-Za-z]/g, '*');
  }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

function WofGame() {
// initialization
    const [phrase, setPhrase] = useState(getRandomPhrase());
    const [asterisks, setAsterisks] = useState(replacePhraseWithAsterisks(phrase));
    const [alreadyInput, setAlreadyInput] = useState('');
    const [numGuess, setNumGuess] = useState(0);
    const [missGuess, setMissGuess] = useState(0);
    const [outOfGuess, setOutOfGuess] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [gameLogs, setGameLogs] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [gameRecords, setGameRecords] = useState([]);
    const [score, setScore] = useState(parseInt(localStorage.getItem("score"), 10));
    const [date, setDate] = useState('');
    const [handle, setHandle] = useState('');
    const [userRecords, setUserRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usernameInput, setUsernameInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [groupedData, setGroupedData] = useState([]);
    const [notFoundUserId, setNotFoundUserId] = useState(true);

    // set username input
    const handleUsernameChange = (event) => {
      setUsernameInput(event.target.value);
    };
    useEffect(()=>{
        const now = new Date();
        const currenttime = now.toString()
        setDate(currenttime);
        console.log("time.")

        // Set up a timer to update the date every second
        const intervalId = setInterval(() => {
          const currentTime = new Date().toString();
          setDate(currentTime);
          console.log("time updated.");
        }, 1000);
      
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    
    },[]);
    // define navigation feature
    const navigateTo = useNavigate();
    // set enter key
    const handleKeyDown = (event) => {
      // Check if the pressed key is Enter
      if (event.key === 'Enter') {
        handleGuess();
      }
    };
    //get login feature
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            setUserId(user.uid);
          } 
        });
      }, []);
    //fetch all data from userRecord and gameRecord
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userResponse = await displayAllUserRecord();
          //console.log('User records:', userResponse.data);
          setUserRecords(userResponse.data);
  
          const gameResponse = await displayAllGameRecord();
         // console.log('Game records:', gameResponse.data);
          setGameRecords(gameResponse.data);
  
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    //get the game win or lose
    useEffect(() => {
      
        // Check if maxGuess is reached
        //#
        if (score < 0) {
        setMessage('Sorry, you used all of your chances.');
        setOutOfGuess(true);
        }

        // Check if the phrase is completely guessed
        if (phrase === asterisks) {
        setMessage('Congratulations! YOU WIN!!!! :)');
        setOutOfGuess(true);

        //#
        //setScore(score + 100);
        }
    }, [numGuess, asterisks, phrase, score]); //re-run this useEffect when these states change
   
    //use input for guess
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
        
    };

    //handle the guess status 
    const handleGuess = () => {
        if (!outOfGuess && userInput.length === 1 && userInput.match(/[A-Za-z]/)) {
        const guess = userInput;
        
        if (alreadyInput.indexOf(guess) === -1) {
            setAlreadyInput(alreadyInput + guess);

            const letterExist = updateAsterisks(guess);

            if (letterExist === 0) {
            const log = `Oops! ${guess} is not in the phrase!`;
            setGameLogs((prevLogs) => [...prevLogs, log]);
            setMissGuess(missGuess + 1);

            if(guess.match(/^[aeiou]$/i)){
              setScore(score - 200);
              console.log("score - 200")
            }else{
              setScore(score - 100)
              console.log("score - 100")
            }

            } else {
            const log = `There is a(n) ${guess}.`;
            setGameLogs((prevLogs) => [...prevLogs, log]);

            if(guess.match(/^[aeiou]$/i)){
              setScore(score - 100);
              console.log("score - 100")
            }else{
              setScore(score + 100)
              console.log("score - 100")
            }
            }
            setNumGuess(numGuess + 1);

            setUserInput('');
        } else {
            const log = `${guess} has been guessed previously. Please try again.`;
            setGameLogs((prevLogs) => [...prevLogs, log]);
        }
        
        }
    };
    // handle logous
    const handleLogout = () =>{
            signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("User signed out");
                navigateTo("/");
            //setIsLoggedIn(false);
            })
            .catch((error) => {
                // An error happened.
                console.error("Logout error", error);
            });
        
        
    }
    // logic to change wilcard
    const updateAsterisks = (guess) => {
        let letterExist = 0;

        for (let i = 0; i < phrase.length; i++) {
        if (phrase[i].toLowerCase() === guess.toLowerCase()) {
            setAsterisks((prevAsterisks) => prevAsterisks.substring(0, i) + phrase[i] + prevAsterisks.substring(i+1));
            letterExist++;
        }
        }

        return letterExist;
    };
    // reset 
    const initializeGame = () => {
        navigateTo("/wheel");
        localStorage.removeItem("score");
    };
    // reset the score too 
    const dontSave =()=>{
      const newPhrase = getRandomPhrase();
      setPhrase(newPhrase);
      setAsterisks(replacePhraseWithAsterisks(newPhrase));
      setAlreadyInput('');
      setNumGuess(0);
      setMissGuess(0);
      setOutOfGuess(false);
      setUserInput('');
      setGameLogs([]);
      setMessage('');
      setScore(parseInt(localStorage.getItem("score"), 10));
    }

  useEffect(() => {
    // Update groupedData whenever userRecords or gameRecords change
    const updatedData = userRecords.map(user => {
      const userGameRecords = gameRecords.filter(record => record.userId === user.userId);
      return { ...user, gameRecords: userGameRecords };
    });
    setGroupedData(updatedData);
  }, [userRecords, gameRecords]);

  // fetch Game record
   const fetchGameRecord = () =>{
      displayAllGameRecord()
        .then(response => {
          setGameRecords(response.data);  // Axios packs the response in a 'data' property
          setLoading(false);
          //console.log(response.data);
          
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });


      };

  // fetch user record
   const fetchUserRecord = () =>{
    displayAllUserRecord()
      .then(response => {
        setUserRecords(response.data);  // Axios packs the response in a 'data' property
        setLoading(false);
       
        const userRecord = response.data.find(user => user.userId === userId);
        
        if (userRecord) {
          console.log("User Id is found:", userRecord.handle);
          setHandle(userRecord.handle)
          setNotFoundUserId(true)
        } else {
          console.log("User not found with userId:", userId);
          setNotFoundUserId(false)
        }
  

      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
    };
    
      useEffect(() => {
        // Call the fetchGameRecords function directly in useEffect
        fetchGameRecord();
        fetchUserRecord();
        //console.log('userId:', userId);
    }, [userId]); // This dependency array ensures it re-runs when userId changes
    
    const handleGameRecordSubmit = async (event) => {
      event.preventDefault();
      
      const postData = {
        userId,
        score,
        date
      };
      // Example of using handleGameRecordComfirm
      try {
        await saveGameRecord(postData);
        fetchGameRecord();
        // Do something after the game record is confirmed
      } catch (error) {
        console.error('Error handling game record:', error);
      }
    };
    // call the save user Record
    const callSaveUserRecord = async () => {
      
      const postData = {
        userId,
        handle
      }
      try {
        await saveUserRecord(postData);
        fetchUserRecord();
        // Do something after the game record is confirmed
      } catch (error) {
        console.error('Error handling game record:', error);
      }
    }
    // call the update user Record
    const callUpdateUserRecord = async ()=>{
      try{
        await updateUserRecord(userId, usernameInput);
        fetchUserRecord();
        console.log("Updateddddddd!!!!!")
      }catch(error){
        console.error('Error handling game record:', error);
      }
    }
    // delete all user Id game record
    const handleDeleteSelected = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete all "+handle+"'s game records?");
      try {
        // Make an API request to delete selected records by user ID
        await deleteByUserId(userId);
        fetchGameRecord()
        console.log("Delete all game record. successful.")
      } catch (error) {
        console.error('Error deleting selected records:', error);

      }
    };

    const handleUsernameSubmit = async (event) => {
      event.preventDefault();
    

      if (usernameInput.trim() === '') {
        console.log("Username cannot be empty.");
        return;
      }
      // Check if usernameInput already exists in groupedData
      const usernameExists = groupedData.some(user => user.handle === usernameInput);

      if (usernameExists) {
        alert(usernameInput+" already exists. Choose a different one.");
        setUsernameInput('');
        return;
      }

      console.log("usernameInput:", usernameInput)
      // Assuming you want to update the handle and trigger a fetch
      await callUpdateUserRecord();
      setUsernameInput('');
      
      setHandle(usernameInput);
      setSubmitted(true);
      

    };

    useEffect (()=>{
    //handle is not equal to "". That means handle is something
      if(!notFoundUserId){
        console.log('will call the save user record');
        callSaveUserRecord();
      }
    },[submitted])// This dependency array ensures it re-runs when submitted changes


  return (
   <div className="HangmanGame">
      <h1 className="game-title">Wheel Of Fortune</h1>
      {handle ? (
        <h5>Welcome: {handle}</h5>
       ) : (
        <h5>Welcome: Guess</h5>
      )}
      <p>Current Date: {date}</p>
      <p>You have : {score} points</p>
    {phrase === asterisks &&(
      <form onSubmit={handleGameRecordSubmit}>
        <button type = "submit" className="btn btn-primary btn-lg"> Save Game</button>
        <button type="button" className="btn btn-secondary btn-lg" onClick={dontSave}>Don't Save</button>
       </form>
    )}

    <form onSubmit={handleUsernameSubmit}>
          <label>
            Enter Username:
            <input type="text" value={usernameInput} onChange={handleUsernameChange} />
          </label>
          <button type="submit" className="btn btn-primary btn-lg">Update</button>
        </form>
      <div className="hangman-container">

        <div className="hangman-phrase">{asterisks}</div>
        
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            maxLength={1}
            className="guess-input"
            onKeyDown={handleKeyDown} // Add keydown event listener
          />
          
          <button onClick={handleGuess} disabled={outOfGuess} className="guess-button">
            Guess
          </button>

          <div className='log-out'>
            <button onClick = {handleLogout}type="button" className="btn btn-primary btn-lg">
            Logout
          </button>
          </div>
          <div className='clear-all'>
            <button onClick = {dontSave}type="button" className="btn btn-primary btn-lg"> Clear all</button>
          </div>

          {outOfGuess && <p className="end-game-message">{message}</p>}
          <button onClick={initializeGame} className="play-again-button">
             Continue
          </button>
        </div>
        <div className="game-info">
          <p className="info-text">
            Attendance: {numGuess}, Missed: {missGuess}
          </p>
          {gameLogs.map((log, index) => (
            <p key={index} className="game-log">{log}</p>
          ))}
        </div>
      </div>
      <div>
      {/* Button to trigger the delete action */}
      <button onClick={handleDeleteSelected}>Delete ALL {handle}'s Game Records</button>
    </div>
      {/* Display Game Records */}
      <div>
        <h2>Game Records</h2>
        {groupedData.map((record) => (
      <li key={record.userId}>
        Player: {record.handle}
        {record.gameRecords.map(gameRecord => (
          <div key={gameRecord.gameId}>
            Score: {gameRecord.score}, Date: {gameRecord.date}
          </div>
        ))}
      </li>
      ))}
      </div>
    </div>
    
    );
}
export default WofGame;
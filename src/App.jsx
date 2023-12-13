/* eslint-disable no-unused-vars */
import {useEffect, useRef, useState} from 'react'
import './App.css'
import './style.css';



function App() {


  

  const [timer, setTimer] = useState("00:00:00")
  const [minutesInput, setMinutesInput] = useState('');
  const ref = useRef()

  function getTimeRemaining(e){
    const total = Date.parse(e) - Date.parse(new Date())
    const hour = Math.floor(total / (1000* 60 * 60) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minute = Math.floor((total / 1000/ 60) % 60);

    return {total, hour, minute, seconds};
  }

  function startTimer(e) {
    let { total, hour, minute, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : '0' + hour) + ':' +
        (minute > 9 ? minute : '0' + minute) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
    }else {
      setTimer('00:00:00');
      clearInterval(ref.current);
    }
  }


  function clearTimer(deadline) {
    setTimer("00:00:00");
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    ref.current = id;
  }

  

  function getDeadTime(minutes){
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + minutes);
    return deadline;
  }

  

  useEffect(() => {
    // if(minutesInput !== ''){
    //   clearTimer(getDeadTime(parseInt(minutesInput)));
    // }
    
    return () => {
      if(ref.current) clearInterval(ref.current);
    };
  }, []);

  function play(){
    if(minutesInput !== ''){
      if (ref.current) clearInterval(ref.current);
      clearTimer(getDeadTime(parseInt(minutesInput)))
    }
  }

  function pause(){
    if(ref.current) clearInterval(ref.current);
  }

  function reset() {
    setMinutesInput('');
    setTimer('00:00:00');
    if (ref.current) clearInterval(ref.current);
  }

  return (
    <div className="flex items-center justify-center">
      <h1>The Timer</h1>
      <input
        type="number"
        placeholder="Enter minutes"
        value={minutesInput}
        onChange={(e) => setMinutesInput(e.target.value)}
        disabled={timer !== '00:00:00'}
      />
      <button onClick={play} disabled={timer !== '00:00:00'}>
        Play
      </button>
      <div><button className='play' onClick={reset} disabled={timer === '00:00:00'}>Reset</button></div>
      
      <div><button onClick={pause} disabled={timer === '00:00:00'}>Pause</button></div>

      <h2>{timer}</h2>
    </div>
  );
  
}

export default App

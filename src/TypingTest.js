// // src/TypingTest.js
import React, { useState, useEffect } from 'react';

const TypingTest = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState(0);

  // Sample text to type
  // src/TypingTest.js
const sampleTexts = [
  'The quick brown fox jumps over the lazy dog.',
  'A journey of a thousand miles begins with a single step.',
  'To be or not to be, that is the question.',
  'All that glitters is not gold.',
  'The early bird catches the worm.',
  'Actions speak louder than words.',
  'Beauty is in the eye of the beholder.',
  'Better late than never.',
  'Practice makes perfect.',
  'Fortune favors the bold.',
  'Every cloud has a silver lining.'
];

// Selecting a random sample text when the test starts
const sampleText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];


  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isStarted && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted, timer]);

  const handleStart = () => {
    setIsStarted(true);
    setText(sampleText);
    setStartTime(new Date());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(new Date());
    }

    if (value === text) {
      setIsStarted(false);
      calculateWpm(value.length, new Date() - startTime);
    }
  };

  const calculateWpm = (chars, timeElapsed) => {
    const words = chars / 5; // Average word length is 5 characters
    const minutes = timeElapsed / 60000;
    setWpm(Math.round(words / minutes));
  };

  const handleReset = () => {
    setText('');
    setInput('');
    setStartTime(null);
    setTimer(0);
    setIsStarted(false);
    setWpm(0);
  };

  return (
    <div className="typing-test">
      <h2>Typing Speed Tester</h2>
      <p className="sample-text">{text || 'Click Start to begin!'}</p>
      <textarea
        value={input}
        onChange={handleChange}
        disabled={!text}
        placeholder="Start typing here..."
        rows="4"
      />
      <div className="controls">
        <button onClick={handleStart} disabled={isStarted}>
          Start
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p>
        Time: <span>{timer} seconds</span>
      </p>
      <p>
        WPM: <span>{wpm}</span>
      </p>
    </div>
  );
};

export default TypingTest;

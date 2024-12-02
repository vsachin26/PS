import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Webcam from 'react-webcam';
import quizData from '../quizData';
import Confetti from './Confetti';
import './Quiz.css';

function QuizGame({ playerName }) {
  const [backgroundColor, setBackgroundColor] = useState('default');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reachedQuizEnd, setReachedQuizEnd] = useState(false);
  const [capture, setCapture] = useState(null);

  // Webcam and face capture references and states
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const captureIntervalRef = useRef(null);

  // Add this state to store the uploaded image URLs
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Start webcam and begin face capture
  const startWebcamCapture = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }

    captureIntervalRef.current = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          console.log('Image captured, preparing for upload...');

          // Convert base64 to blob
          const blob = await convertBase64ToBlob(imageSrc);

          // Upload the image
          await handleImageUpload(blob);

          setCapturedImages((prevImages) => [...prevImages, imageSrc]);
        }
      }
    }, 5000);
  };

  // Stop webcam capture
  const stopWebcamCapture = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  };

  // Initial webcam setup
  useEffect(() => {
    startWebcamCapture();

    // Cleanup function
    return () => {
      stopWebcamCapture();
    };
  }, []);

  // Stop capture when quiz ends
  useEffect(() => {
    if (reachedQuizEnd) {
      stopWebcamCapture();
    }
  }, [reachedQuizEnd]);

  const handleNextQuestion = () => {
    setBackgroundColor('default');
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setReachedQuizEnd(true);
      setShowScore(true);
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerOptionClick = (index) => {
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
      setBackgroundColor('correct');
    } else {
      setBackgroundColor('incorrect');
    }
    setTimeout(handleNextQuestion, 500);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setShowConfetti(false);
    setReachedQuizEnd(false);
    setBackgroundColor('default');
    setCapturedImages([]);
    setUploadedImageUrls([]); // Clear uploaded image URLs
    startWebcamCapture();
  };

  const handleImageUpload = async (imageBlob) => {
    try {
      console.log('Preparing to upload image blob:', imageBlob);

      const formData = new FormData();
      formData.append('image', imageBlob, 'captured-image.jpg');

      console.log('Sending request to server...');
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      // Store the uploaded image URL
      if (response.data.fileUrl) {
        setUploadedImageUrls((prev) => [...prev, response.data.fileUrl]);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  // Function to convert Base64 to Blob
  const convertBase64ToBlob = async (base64Data) => {
    const byteString = atob(base64Data.split(',')[1]); // Decode Base64 string
    const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeString });
  };

  return (
    <div className={`one ${backgroundColor}`}>
      <div className="quiz">
        {/* Webcam component */}
        <div className="webcam-container" style={{ display: 'none' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 220,
              height: 200,
              facingMode: 'user',
            }}
          />
        </div>

        {showConfetti && <Confetti />}
        {showScore ? (
          <div className="score-section">
            <h1>🎉 Congratulations {playerName}! 🎉</h1>
            <h2>
              Your Score: {score} / {quizData.length}
            </h2>
            <button onClick={handleRestartQuiz}>Restart Quiz</button>

            {/* Optional: Display captured images */}
            <div className="captured-images">
              <h3>Captured Images During Quiz:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {uploadedImageUrls.map((imageUrl, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={imageUrl}
                      alt={`Captured ${index + 1}`}
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid #ddd',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="timer">Time Left: {timeLeft}s</div>
            <div className="question-section">
              <h2>{quizData[currentQuestion].question}</h2>
              {quizData[currentQuestion].image && (
                <img
                  src={quizData[currentQuestion].image}
                  alt="quiz illustration"
                />
              )}
              <div className="options">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(index)}
                    className="option-button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizGame;

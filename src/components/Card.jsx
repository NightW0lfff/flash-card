import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

function Card({ Card }) {
  const [isFlipped, setFlip] = useState(false);
  const [question, setQuestion] = useState("Please Enter Question");
  const [answer, setAnswer] = useState("Please Enter Answer");
  const { speak, voices } = useSpeechSynthesis();

  const handleCardFlip = () => {
    setFlip(!isFlipped);
  };

  const handleTextSpeak = (data) => {
    // ADD SWITCH TO CONTROL SPEAK STOP, RESET, CONTINUE
    // ADD ICON FOR RESET, STOP(REPLACE THE SPEAKER ICON)
    const value = data.toLowerCase();
    const voice = voices.find(
      (data) => data.name === "Google UK English Female"
    );
    speak({
      text: value,
      voices: voice,
    });
  };

  useEffect(() => {
    if (!Card) return;
    if (Card.question) setQuestion(Card.question);
    if (Card.answer) setAnswer(Card.answer);
    setFlip(false);
  }, [Card]);

  return (
    <div className="card">
      <div
        className={`card__main card__main--front ${isFlipped ? "flipped" : ""}`}
      >
        <div
          className="card__main--btn-speaker btn__main-speaker fa-solid fa-volume-high"
          onClick={(e) => {
            handleTextSpeak(question);
          }}
        />
        <div className="card__main--header">
          <div className="card__main--header-title">Question</div>
          <div className="card__main--header-btn">
            <div className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square" />
            <div className="card__main--header-btn btn__card--header fa-solid fa-trash" />
          </div>
        </div>
        <div className="card__main--container-main">{question}</div>
        <div
          className="card__main--btn-flip btn btn__main-flip"
          onClick={handleCardFlip}
        >
          Flip it!
        </div>
      </div>
      <div
        className={`card__main card__main--back ${isFlipped ? "flipped" : ""}`}
      >
        <div
          className="card__main--btn-speaker btn__main-speaker fa-solid fa-volume-high"
          onClick={(e) => {
            handleTextSpeak(answer);
          }}
        />
        <div className="card__main--header">
          <div className="card__main--header-title">Answer</div>
          <div className="card__main--header-btn">
            <div className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square" />
            <div className="card__main--header-btn btn__card--header fa-solid fa-trash" />
          </div>
        </div>
        <div className="card__main--container-main">{answer}</div>
        <div
          className="card__main--btn-flip btn btn__main-flip"
          onClick={handleCardFlip}
        >
          Flip it!
        </div>
      </div>
    </div>
  );
}

export default Card;

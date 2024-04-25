import React, { useEffect, useState } from "react";

function Card({ Card, deleteCard, isEmpty, updateCard }) {
  const [isFlipped, setFlip] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const synth = window.speechSynthesis;
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isEditting, setEditting] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = synth.getVoices();
      const voice = voices.find(
        (data) =>
          // data.name === "Google UK English Female" && data.lang === "en-GB"  -- Best for pronouncing Chemical Name
          data.name === "Catherine" && data.lang === "en-AU"
      );
      setSelectedVoice(voice);
    };

    // Call handleVoicesChanged initially
    handleVoicesChanged();

    // Listen for voiceschanged event to update voices
    synth.addEventListener("voiceschanged", handleVoicesChanged);

    // Cleanup event listener on unmount
    return () => {
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, [synth]);

  const handleCardFlip = () => {
    setFlip(!isFlipped);
  };

  const handleTextSpeak = (value) => {
    // ADD SWITCH TO CONTROL SPEAK STOP, RESET, CONTINUE
    // ADD ICON FOR RESET, STOP(REPLACE THE SPEAKER ICON)

    const utterance = new SpeechSynthesisUtterance(value.toLowerCase());
    utterance.voice = selectedVoice; //voice of speaker
    utterance.rate = 1.15; //speak rate

    if (!synth.speaking && !synth.onvoiceschanged) {
      synth.speak(utterance);
    } else {
      synth.cancel(utterance);
    }
  };

  const toggleEditMode = () => {
    setEditting((prev) => !prev);
  };

  const handleEditting = (id) => {
    updateCard(id, { question: question, answer: answer });
  };

  useEffect(() => {
    if (!Card || !Card.question || !Card.answer) return;
    setQuestion(Card.question);
    setAnswer(Card.answer);
    setFlip(false);
  }, [Card]);

  return (
    <>
      {isEmpty ? (
        <div className="card">
          <div className="card__main card__main--empty">
            <h2 className="card__main--empty-title">
              Empty! Please Create To Start
            </h2>
          </div>
        </div>
      ) : (
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
                <div
                  className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square"
                  onClick={(e) => setEditting(true)}
                />
                <div
                  className="card__main--header-btn btn__card--header fa-solid fa-trash"
                  onClick={(e) => deleteCard(Card._id)}
                />
              </div>
            </div>
            {isEditting ? (
              <>
                <textarea
                  className="card__main--context card__main--context-input"
                  type="textarea"
                  defaultValue={question}
                  autoFocus
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                      toggleEditMode();
                    }
                  }}
                />
                <div
                  className="card__main--btn-flip btn btn__main-flip"
                  onClick={(e) => {
                    toggleEditMode();
                    handleEditting(Card._id);
                  }}
                >
                  Done
                </div>
              </>
            ) : (
              <>
                <div className="card__main--context">{question}</div>
                <div
                  className="card__main--btn-flip btn btn__main-flip"
                  onClick={handleCardFlip}
                >
                  Flip it!
                </div>
              </>
            )}
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
                <div
                  className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square"
                  onClick={(e) => setEditting(true)}
                />
                <div
                  className="card__main--header-btn btn__card--header fa-solid fa-trash"
                  onClick={(e) => deleteCard(Card._id)}
                />
              </div>
            </div>
            {isEditting ? (
              <>
                <textarea
                  className="card__main--context card__main--context-input"
                  type="textarea"
                  defaultValue={answer}
                  autoFocus
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                      toggleEditMode();
                    }
                  }}
                />
                <div
                  className="card__main--btn-flip btn btn__main-flip"
                  onClick={(e) => {
                    toggleEditMode();
                    handleEditting(Card._id);
                  }}
                >
                  Done
                </div>
              </>
            ) : (
              <>
                <div className="card__main--container-main">{answer}</div>
                <div
                  className="card__main--btn-flip btn btn__main-flip"
                  onClick={handleCardFlip}
                >
                  Flip it!
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

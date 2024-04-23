import React, { useState } from "react";

function CardForm({ onCreateCard, setOpen }) {
  const [topic, setTopic] = useState(null);

  const toggleForm = () => {
    setOpen(false);
  };

  const handleCreateCard = async (data) => {
    if (!data) return;

    try {
      const res = await fetch(`http://localhost:8000/api/cards/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data }),
      });
      if (!res.ok) {
        return;
      }
      onCreateCard();
      toggleForm();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="card_form__bg">
      <div className="card_form">
        <div className="card_form__container">
          <h2 className="card_form__title">What is your new topic?</h2>
          <input
            className="card_form__input"
            type="text"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
            autoFocus
          />
          <div className="card_form__container--btn">
            <button
              className="card_form__btn--cancel btn btn--form"
              onClick={(e) => toggleForm()}
            >
              Cancel
            </button>
            <button
              className="card_form__btn--create btn btn--form"
              onClick={(e) => handleCreateCard(topic)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardForm;

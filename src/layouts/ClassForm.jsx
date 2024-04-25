import React, { useState } from "react";

function ClassForm({ onCreateClass, setOpen }) {
  const [topic, setTopic] = useState(null);

  const toggleForm = () => {
    setOpen(false);
  };

  const handleCreateClass = async (data) => {
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
      onCreateClass();
      toggleForm();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="class_form__bg">
      <div className="class_form">
        <div className="class_form__container">
          <h2 className="class_form__title">What is your new topic?</h2>
          <input
            className="class_form__input"
            type="text"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
            autoFocus
          />
          <div className="class_form__container--btn">
            <button
              className="class_form__btn--cancel btn btn--form"
              onClick={(e) => toggleForm()}
            >
              Cancel
            </button>
            <button
              className="class_form__btn--create btn btn--form"
              onClick={(e) => handleCreateClass(topic)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassForm;

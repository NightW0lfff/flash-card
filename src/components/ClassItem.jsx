import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function ClassItem({ id, title, count, deleteClass }) {
  const [isEditting, setEditting] = useState(false);
  const [updatedTitle, setTitle] = useState(title);

  const updateTitle = async (id, data) => {
    try {
      const res = await fetch(`http://localhost:8000/api/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data }),
      });
      if (!res.ok) {
        return;
      }

      setTitle(data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const toggleEditMode = () => {
    setEditting((prev) => !prev);
  };

  const handleEditting = (data) => {
    updateTitle(id, data);
  };

  return (
    <>
      <NavLink className="class" to={`/class/${id}`}>
        <div className="class__left_item">
          <div className="class__left_item--container">
            <div className="class__left_item--count">
              <h1 className="class__left_item--count-val">{count}</h1>
            </div>
          </div>
          {isEditting ? (
            <input
              className="class__left_item--input"
              type="text"
              defaultValue={updatedTitle}
              autoFocus
              onBlur={(e) =>
                setTimeout(() => {
                  isEditting && setEditting(false);
                }, 100)
              }
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  toggleEditMode();
                  if (e.target.value !== e.target.defaultValue) {
                    handleEditting(e.target.value);
                  }
                }
              }}
            />
          ) : (
            <h2 className="class__left_item--title">{updatedTitle}</h2>
          )}
        </div>
        <div className="class__right_item">
          <div
            className="class__right_item--icon fa-regular fa-pen-to-square"
            onClick={(e) => {
              e.preventDefault(); // Prevent default click behaviour
              toggleEditMode();
            }}
          />
          <div
            className="class__right_item--icon fa-solid fa-trash"
            onClick={(e) => {
              e.preventDefault();
              deleteClass(id);
            }}
          />
          {/* <div className="class__right_item--icon fa-regular fa-star" />
        <div className="class__right_item--icon fa-solid fa-star" /> */}
        </div>
      </NavLink>
    </>
  );
}

export default ClassItem;

import React, { useEffect, useState } from "react";
import useFetch from "../functions/useFetch";
import ClassItem from "../components/ClassItem";

function Card({ shouldReload }) {
  const [card, setCard] = useState(null);

  const { data, error, isLoading, refetch } = useFetch(
    `http://localhost:8000/api/cards`
  );

  const deleteCard = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/cards/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        return;
      }
      setCard((prevCard) => prevCard.filter((card) => card._id !== id));
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (shouldReload) {
      refetch(); // Trigger a refetch when shouldReload changes
    }
  }, [shouldReload, refetch]);

  useEffect(() => {
    if (!data || error) return;
    setCard(data.cards);
  }, [data, error]);

  return (
    <div className="card">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        card &&
        !error &&
        card.map((data) => (
          <ClassItem
            key={data._id}
            id={data._id}
            title={data.title}
            count={data.card.length}
            deleteCard={deleteCard}
          />
        ))
      )}
    </div>
  );
}

export default Card;

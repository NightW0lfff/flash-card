import React, { useEffect, useState } from "react";
import useFetch from "../functions/useFetch";
import ClassItem from "../components/ClassItem";

function Class({ shouldReload }) {
  const [card, setCard] = useState(null);

  const { data, error, isLoading, refetch } = useFetch(
    `http://54.252.236.4:8080/api/cards`
  );

  const deleteClass = async (id) => {
    try {
      const res = await fetch(`http://54.252.236.4:8080/api/cards/${id}`, {
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
    <div className="class__main">
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
            count={data.cards.length}
            deleteClass={deleteClass}
          />
        ))
      )}
    </div>
  );
}

export default Class;

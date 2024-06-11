import React, { useEffect, useState } from "react";
import useFetch from "../functions/useFetch";
import ClassItem from "../components/ClassItem";

function Class({ shouldReload }) {
  // let card = [
  //   { _id: 1, title: "Class 1", cards: [] },
  //   { _id: 2, title: "Class 2", cards: [] },
  //   { _id: 3, title: "Class 3", cards: [] },
  // ];
  // useEffect(() => {
  //   localStorage.setItem("card", JSON.stringify(card));
  // }, [card]);

  const [card, setCard] = useState(JSON.parse(localStorage.getItem("card")));

  // const [card, setCard] = useState(init_card);

  // const { data, error, isLoading, refetch } = useFetch(
  //   `//54.252.236.4:8080/api/cards`
  // );

  // const deleteClass = async (id) => {
  //   try {
  //     const res = await fetch(`//54.252.236.4:8080/api/cards/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) {
  //       return;
  //     }
  //     setCard((prevCard) => prevCard.filter((card) => card._id !== id));
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

  const deleteClass = (id) => {
    let cur_list = JSON.parse(localStorage.getItem("card"));
    if (cur_list === null) return;
    if (cur_list.length === 1) {
      localStorage.removeItem("card");
      setCard(null);
      return;
    }
    cur_list = cur_list.filter((card) => card._id !== id);
    localStorage.setItem("card", JSON.stringify(cur_list));
    setCard(cur_list);
  };

  useEffect(() => {
    if (shouldReload) {
      // refetch(); // Trigger a refetch when shouldReload changes
      setCard(JSON.parse(localStorage.getItem("card")));
    }
  }, [shouldReload]);

  // useEffect(() => {
  //   if (!data || error) return;
  //   setCard(data.cards);
  // }, [data, error]);

  return (
    <div className="class__main">
      {/* {isLoading ? (
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
      )} */}
      {card &&
        card.map((data) => (
          <ClassItem
            key={data._id}
            card={card}
            id={data._id}
            title={data.title}
            count={data.cards.length}
            deleteClass={deleteClass}
          />
        ))}
    </div>
  );
}

export default Class;

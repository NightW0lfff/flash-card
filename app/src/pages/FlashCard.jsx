import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import useFetch from "../functions/useFetch";
import Card from "../components/Card";
import Loading from "../layouts/Loading";

function FlashCard() {
  const { id } = useParams();
  const [card, setCard] = useState({
    title: "",
    cards: [],
  });
  const [curIndex, setCurIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const { data, error, isLoading, refetch } = useFetch(
    `http://54.252.236.4:8080/api/cards/${id}`
  );

  const createCard = async () => {
    try {
      const res = await fetch(`http://54.252.236.4:8080/api/items/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "Please Enter Question Here",
          answer: "Please Enter Answer Here",
        }),
      });
      if (!res.ok) {
        return;
      }

      const responseBody = await res.json();
      setCard(responseBody.card);

      refetch();
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateCard = async (itemId, data) => {
    try {
      const res = await fetch(
        `http://54.252.236.4:8080/api/items/${id}/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: data.question,
            answer: data.answer,
          }),
        }
      );
      if (!res.ok) {
        return;
      }
      // refetch();
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteCard = async (itemId) => {
    try {
      const res = await fetch(
        `http://54.252.236.4:8080/api/items/${id}/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        return;
      }
      const responseBody = await res.json();
      const cards = responseBody.card.cards;
      if (cards.length < curIndex + 1) handleCardMove({ type: "PREV_CARD" });
      refetch();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleCardMove = (action) => {
    switch (action.type) {
      case "PREV_CARD":
        if (curIndex === 0) return;
        setCurIndex((prevIndex) => prevIndex - 1);
        break;
      case "NEXT_CARD":
        if (curIndex === card.cards.length - 1) return;
        setCurIndex((prevIndex) => prevIndex + 1);
        break;
      case "SET":
        setCurIndex(action.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!data || !data.card) return;
    if (data.card._id !== id) {
      refetch();
    } else {
      setCard(data.card);
    }
  }, [data, id, refetch]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        console.log("to false");
        setShowLoading(false);
      }, 500);
    }
    setShowLoading(true);
    console.log("to true");

    return () => clearTimeout();
  }, [isLoading]);

  useEffect(() => {
    refetch();
  }, [curIndex, refetch]);

  return (
    <div className="main">
      <Header displayButton={"none"} />
      {error || showLoading ? (
        <Loading />
      ) : (
        <div className="flashcard">
          <div className="flashcard__overview">
            <div className="flashcard__overview--total">
              {card.title} - {card.cards ? card.cards.length : "0"}
            </div>
            <div
              className="flashcard__overview--btn btn btn--create-card"
              onClick={(e) => {
                createCard();
                handleCardMove({ type: "SET", value: card.cards.length });
              }}
            >
              Create Card
            </div>
          </div>
          <div className="flashcard__content">
            <div
              className="flashcard__btn flashcard__btn--prev btn__arr"
              onClick={(e) => handleCardMove({ type: "PREV_CARD" })}
            >
              &larr;
            </div>
            <Card
              isEmpty={card.cards.length === 0}
              Card={card.cards[curIndex]}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
            <div
              className="flashcard__btn flashcard__btn--next btn__arr"
              onClick={(e) =>
                card.cards.length - 1 > curIndex &&
                handleCardMove({ type: "NEXT_CARD" })
              }
            >
              &rarr;
            </div>
          </div>
          <div className="flashcard__count--cur">{`${card.cards.length < 1 ? 0 : curIndex + 1} of ${card.cards.length}`}</div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;

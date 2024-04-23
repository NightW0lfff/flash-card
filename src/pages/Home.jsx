import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Card from "../layouts/CardContainer";
import CardForm from "../layouts/CardForm";

function Home() {
  const [isOpen, setOpen] = useState(false);
  const [shouldReloadCards, setShouldReloadCards] = useState(false);

  useEffect(() => {
    if (shouldReloadCards) {
      setShouldReloadCards(false);
    }
  }, [shouldReloadCards]);

  const handleCreateCard = () => {
    setShouldReloadCards(true);
  };

  return (
    <div className="main">
      {isOpen && <CardForm onCreateCard={handleCreateCard} setOpen={setOpen} />}
      <Header setOpen={setOpen} />
      <Card shouldReload={shouldReloadCards} />
    </div>
  );
}

export default Home;

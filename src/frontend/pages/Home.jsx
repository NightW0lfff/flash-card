import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Class from "../layouts/Class";
import ClassForm from "../layouts/ClassForm";

function Home() {
  const [isOpen, setOpen] = useState(false);
  const [shouldReloadClass, setShouldReloadClass] = useState(false);

  useEffect(() => {
    if (shouldReloadClass) {
      setShouldReloadClass(false);
    }
  }, [shouldReloadClass]);

  const handleCreateClass = () => {
    setShouldReloadClass(true);
  };

  return (
    <div className="main">
      {isOpen && (
        <ClassForm onCreateClass={handleCreateClass} setOpen={setOpen} />
      )}
      <Header setOpen={setOpen} />
      <Class shouldReload={shouldReloadClass} />
    </div>
  );
}

export default Home;

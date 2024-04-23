import React from "react";

function Header({ setOpen }) {
  const toggleForm = () => {
    setOpen(true);
  };
  return (
    <div className="header">
      <h1 className="header__title">
        baoanh.owl <span>🦉</span>
      </h1>
      <button className="btn header__btn" onClick={(e) => toggleForm()}>
        Add Section
      </button>
    </div>
  );
}

export default Header;

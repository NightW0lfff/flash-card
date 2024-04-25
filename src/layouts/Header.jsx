import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ setOpen, displayButton }) {
  const [btnDisplay, setBtnDisplay] = useState(true);

  const toggleForm = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!displayButton) return;
    setBtnDisplay(false);
  }, [displayButton]);

  return (
    <div className="header">
      <NavLink className="header__title" to={"/"}>
        baoanh.owl <span>🦉</span>
      </NavLink>
      <button
        className={`btn header__btn ${btnDisplay ? "" : "hidden"}`}
        onClick={(e) => toggleForm()}
      >
        Add Section
      </button>
    </div>
  );
}

export default Header;

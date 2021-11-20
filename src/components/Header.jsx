import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const boldStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <div className="header-container">
      <ul className="header-item header-left">
        <li className="header-text"> Battleship Game</li>
      </ul>
      <ul className="header-item header-right">
        <li>
          <NavLink
            className="header-text header-unselected"
            style={boldStyle}
            to="/instruction"
          >
            Game Instruction
          </NavLink>
        </li>
        <li>
          <NavLink
            className="header-text header-unselected"
            style={boldStyle}
            to="/homepage"
          >
            Home Page
          </NavLink>
        </li>
        <li>
          <NavLink
            className="header-text header-unselected"
            style={boldStyle}
            to="/gameplay"
          >
            Game Play
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

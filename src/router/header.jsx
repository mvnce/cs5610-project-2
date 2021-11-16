import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Header.css";

const boldStyle = ({isActive}) => ({
    fontWeight:isActive ? "bold" : "normal", 
});

export default function Header() {
    return (
        <> 
            <div id="SectionHeader">
                <NavLink style={boldStyle} to="/homepage">Home Page</NavLink>
                <NavLink style={boldStyle} to="/gameplay">Game Play</NavLink>
                <NavLink style={boldStyle} to="/instruction">Game Instruction</NavLink>
            </div>
        </>
    )
}
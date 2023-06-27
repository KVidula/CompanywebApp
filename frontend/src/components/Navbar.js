import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
            {/* eslint-disable-next-line*/}
                <a className="navbar-brand">WEB APP</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to='/'>Add Company</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to='/companies'>All Companies</NavLink>
                    </li>
                    
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;
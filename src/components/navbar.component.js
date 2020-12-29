import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/inventory-list.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <Link to="/" className="navbar-brand">Inventory Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Items</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Item Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create Item</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

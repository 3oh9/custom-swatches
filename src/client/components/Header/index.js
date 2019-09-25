import React from 'react';
import { Link } from 'react-router-dom';
import navList from './utils/navList';
import './style.scss';

const Header = () => (
  <section className="header">
    <div className="nav">
      <ul className="nav-list">
        {
          navList.map(n => (
            <li key={n.id}>
              <Link to={n.link}>
                {n.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </section>
);

export default Header;

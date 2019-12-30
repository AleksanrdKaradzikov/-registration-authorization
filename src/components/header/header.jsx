import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ pageName, links = [], to = null }) => {
  return (
    <header className="header">
      <div className="row">
        <div className="col-6">
          <h3 className="header__heading">{pageName}</h3>
        </div>
        <div className="col-6">
          <ul className="header__list">
            {links.map(link => {
              return (
                <li key={link} className="header__list-item">
                  <Link className="header-link" to={to}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.defaultProps = {
  pageName: 'Главная страница',
  links: [],
  to: null,
};

Header.propTypes = {
  pageName: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  to: PropTypes.string,
};

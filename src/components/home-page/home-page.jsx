import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header';
import * as actions from '../../actions';
import './home-page.css';

const mapStateToProps = ({ user }) => {
  const props = {
    id: user.userData.id,
    email: user.userData.email,
    username: user.userData.username,
  };

  return props;
};

const actionCreators = {
  exit: actions.exit,
};

const HomePage = ({ id, email, username, exit }) => {
  return (
    <>
      <Header pageName="Главная страница" />
      <div className="wrapper-page">
        <div className="container">
          <form className="home-page-form" onSubmit={exit}>
            <div className="home-page-form__label">id: {id}</div>
            <div className="home-page-form__label">Email: {email}</div>
            <div className="home-page-form__label">Имя пользователя: {username}</div>
            <button className="btn-exit" type="submit">
              Выйти из личного кабинета
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(HomePage);

HomePage.defaultProps = {
  id: '',
  email: '',
  username: '',
  exit: () => {},
};

HomePage.propTypes = {
  id: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  exit: PropTypes.func,
};

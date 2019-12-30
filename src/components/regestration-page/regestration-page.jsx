import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import * as actions from '../../actions';
import Header from '../header';
import './regestration-page.css';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Имя пользователя не менее 2 символов')
    .max(40, 'Имя пользователя не более 40 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Пароль не менее 8 символов')
    .max(40, 'Пароль не более 40 символов')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Введите корректный email адресс')
    .required('Обязательное поле'),
});

const mapStateToProps = ({ user }) => {
  const props = {
    isSuccessful: user.isSuccessful,
    error: user.error,
  };

  return props;
};

const actionCreators = {
  registration: actions.registration,
};

class RegestrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRegestrationSbm = ({ username, password, email }, resetForm) => {
    const { registration } = this.props;
    const data = JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    });
    registration(data, resetForm);
  };

  render() {
    const { isSuccessful, error } = this.props;
    return (
      <>
        <Header pageName="Страница регестрации" links={['авторизация']} to="/login" />
        <div className="wrapper-page">
          <h2 className="wrapper-page__heading">Регестрация</h2>
          <p className="wrapper-page__text">
            Введите имя пользователя, email адресс и пароль для регестрации в личном кабинете
          </p>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(isSuccessful);
              this.handleRegestrationSbm(values, resetForm);
            }}
          >
            <Form className="form-regestration">
              <Field
                name="username"
                type="text"
                placeholder="Имя пользователя"
                className="form-regestration__input"
                id="username"
              />
              <ErrorMessage name="username">
                {msg => <div className="form-regestration__error--message">{msg}</div>}
              </ErrorMessage>
              {error ? (
                <div className="form-regestration__error--message">{error.username}</div>
              ) : null}
              <Field
                name="email"
                type="email"
                placeholder="Ваш Email"
                className="form-regestration__input"
                id="email"
              />
              <ErrorMessage name="email">
                {msg => <div className="form-regestration__error--message">{msg}</div>}
              </ErrorMessage>
              {error ? (
                <div className="form-regestration__error--message">{error.email}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="Ваш пароль"
                className="form-regestration__input"
              />
              <ErrorMessage name="password">
                {msg => <div className="form-regestration__error--message">{msg}</div>}
              </ErrorMessage>
              {error ? (
                <div className="form-regestration__error--message">{error.password}</div>
              ) : null}
              <button className="btn-submit" type="submit">
                Зарегестрироваться
              </button>
              <Link to="/login">
                <button className="btn-standart" type="button">
                  Уже зарегестрированы?
                </button>
              </Link>
              {isSuccessful ? (
                <div className="successes-message">Регестрация прошла успешно</div>
              ) : null}
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(RegestrationPage);

RegestrationPage.defaultProps = {
  registration: null,
  isSuccessful: null,
  error: null,
};

RegestrationPage.propTypes = {
  registration: PropTypes.func,
  isSuccessful: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
};

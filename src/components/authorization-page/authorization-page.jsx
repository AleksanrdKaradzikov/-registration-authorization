import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header';
import * as actions from '../../actions';
import './authorization-page.css';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(40, 'Не более 40 символов')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Введите корректный email адресс')
    .required('Обязательное поле'),
});

const mapStateToProps = ({ user }) => {
  const props = {
    isAuthorized: user.isAuthorized,
    error: user.error,
  };

  return props;
};

const actionCreators = {
  login: actions.login,
};

class AuthorizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLoginSbm = ({ password, email }, resetForm) => {
    const { login } = this.props;
    const data = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    login(data, resetForm);
  };

  render() {
    const { isAuthorized, error } = this.props;
    const render = () => (isAuthorized ? <Redirect to="/" /> : null);
    return (
      <>
        <Route exact path="/login" render={render} />
        <Header pageName="Страница авторизации" links={['Регестрация']} to="/signup" />
        <div className="wrapper-page">
          <h2 className="wrapper-page__heading">Авторизоваться</h2>
          <p className="wrapper-page__text">
            Чтобы войти на сайт используйте ваш email и пароль, которые были указаны при регистрации
            на сайт
          </p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              this.handleLoginSbm(values, resetForm);
            }}
          >
            <Form className="form-auhorization">
              <Field
                name="email"
                type="email"
                placeholder="Ваш Email"
                className="form-auhorization__input"
                id="email"
              />
              <ErrorMessage name="email">
                {msg => <div className="form-auhorization__error--message">{msg}</div>}
              </ErrorMessage>
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="Ваш пароль"
                className="form-auhorization__input"
              />
              <ErrorMessage name="password">
                {msg => <div className="form-auhorization__error--message">{msg}</div>}
              </ErrorMessage>
              {error ? (
                <div className="form-auhorization__error--message">
                  Неправильный email или пароль
                </div>
              ) : null}
              <button className="btn-submit" type="submit">
                Войти в личный кабинет
              </button>
              <Link to="/signup">
                <button className="btn-standart" type="button">
                  Зарегестрироваться
                </button>
              </Link>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(AuthorizationPage);

AuthorizationPage.defaultProps = {
  isAuthorized: null,
  login: () => {},
  error: {},
};

AuthorizationPage.propTypes = {
  isAuthorized: PropTypes.bool,
  login: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
};

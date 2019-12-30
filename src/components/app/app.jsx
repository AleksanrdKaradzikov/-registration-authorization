import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorizationPage from '../authorization-page';
import RegestrationPage from '../regestration-page';
import HomePage from '../home-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import '../../styles/style.css';

const mapStateToProps = state => {
  const props = {
    isAuthorized: state.user.isAuthorized,
  };

  return props;
};

const App = ({ isAuthorized }) => {
  const render = () => (!isAuthorized ? <Redirect to="/login" /> : <HomePage />);
  return (
    <div className="container">
      <Router>
        <Route path="/login" component={AuthorizationPage} />
        <Route path="/signup" component={RegestrationPage} />
        <Route path="/" exact render={render} />
      </Router>
    </div>
  );
};

export default connect(mapStateToProps)(App);

App.defaultProps = {
  isAuthorized: null,
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
};

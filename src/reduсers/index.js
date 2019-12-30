import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const user = handleActions(
  {
    [actions.userReg](state, { payload: { reg } }) {
      return { ...state, isSuccessful: reg, error: null };
    },
    [actions.userRegErr](state, { payload: { error } }) {
      return { ...state, isSuccessful: null, error };
    },
    [actions.userLogin](state, { payload: { user: us } }) {
      return { ...state, userData: { ...us }, isAuthorized: true };
    },
    [actions.userLoginErr](state) {
      return { ...state, error: true };
    },
    [actions.userExit](state) {
      return {
        ...state,
        isSuccessful: null,
        isAuthorized: null,
        error: null,
        userData: null,
      };
    },
  },
  {
    isSuccessful: null,
    isAuthorized: null,
    error: null,
    userData: null,
  }
);

const rootReducer = combineReducers({ user });

export default rootReducer;

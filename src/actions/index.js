import { createAction } from 'redux-actions';

export const userReg = createAction('USER_REG');
export const userRegErr = createAction('USER_REG_ERROR');
export const userLogin = createAction('USER_LOGIN');
export const userLoginErr = createAction('USER_LOGIN_ERROR');
export const userExit = createAction('USER_LOGIN_EXIT');

export const registration = (data, resetForm) => async dispatch => {
  const response = await fetch(`https://conduit.productionready.io/api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  if (response.ok) {
    resetForm();
    return dispatch(userReg({ reg: true }));
  }

  const error = await response.json().then(err => {
    return err.errors;
  });

  return dispatch(userRegErr({ error }));
};

export const login = (data, resetForm) => async dispatch => {
  const response = await fetch(`https://conduit.productionready.io/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: data,
  });

  if (response.ok) {
    const user = await response.json().then(userData => {
      return userData;
    });
    resetForm();
    return dispatch(userLogin({ user: { ...user.user } }));
  }

  return dispatch(userLoginErr());
};

export const exit = () => {
  return userExit();
};

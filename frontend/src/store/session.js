// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

// import { csrfFetch } from "./csrf"

// const LOGIN_SESSION = 'session/loginSession'
// const LOGOUT_SESSION = 'session/logoutSession'

// export const loginSession = (user) => {
//       return {
//             type: LOGIN_SESSION,
//             user
//       }
// }

// export const logoutSession = () => {
//       return {
//             type: LOGOUT_SESSION
//       }
// }

// const initialState = {
//       "user": null
// }

// export const thunkLogin = (credential, password) => async (dispatch) => {
//       const res = await csrfFetch('/api/session', {
//             method: 'POST',
//             body: JSON.stringify({credential, password})
//       })

//       if (res.ok) {
//             const data = await res.json()
//             dispatch(loginSession(data.user))
//       }
// }

// const sessionReducer = (state = initialState, action) => {
//       switch (action.type) {
//             case LOGIN_SESSION:
//                   return { ...state, user: action.user }
//             case LOGOUT_SESSION:
//                   return { ...state, user: null}
//             default:
//                   return state
//       }
// }

// export default sessionReducer;

import * as types from '../types/user';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER__LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case types.USER__LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

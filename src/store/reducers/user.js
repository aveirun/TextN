import * as types from '../types/user';

const initialState = {
  user: null,
  anotherUser: null,
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
    case types.USER__SUBSCRIBE:
      return {
        ...state,
        user: {
          ...state.user,
          subscriptions: [...state.user.subscriptions, action.userID],
        },
      };
    case types.USER__GET_ANOTHER_USER_SUCCESS:
      return { ...state, anotherUser: action.anotherUser };
    default:
      return state;
  }
};

export default userReducer;

import * as types from '../types/post';

const initialState = {
  post: {
    posts: [],
    totalCount: 0,
    post: null,
    isLoading: false,
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        totalCount: 0,
      };
    case types.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalCount: action.payload.totalCount,
      };
    case types.GET_POST_BY_ID:
      return {
        ...state,
        post: action.payload,
      };
    case types.UPDATE_POSTS:
      return {
        ...state,
        posts: state.posts.map(p =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case types.UPDATE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case types.ADD_POST:
      return {
        ...state,
        post: action.payload,
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;

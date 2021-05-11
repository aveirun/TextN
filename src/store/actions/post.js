import firebase from '../../services/firebase';
import { dispatch } from '../index';
import * as types from '../types/post';
import { FORM_ERROR } from 'final-form';
import { push } from 'connected-react-router';

export const addPost = async post => {
  try {
    const response = await firebase.addPost(post);
    dispatch({ type: types.ADD_POST, payload: response.data() });
    dispatch(push('/news'));
  } catch (error) {
    console.log(error);
    return { [FORM_ERROR]: 'invalid form' };
  }
};

export const getAll = async params => {
  try {
    const response = await firebase.getAll('/news', { params });
    dispatch({
      type: types.GET_ALL_POSTS,
      payload: {
        posts: response.docs[0].data(),
        totalCount: +response.headers['x-total-count'],
      },
    });
  } catch {
    dispatch(clearPosts());
  }
};

export const getById = async id => {
  try {
    const response = await firebase.getById(`/news/${id}`);
    dispatch({
      type: types.GET_POST_BY_ID,
      payload: {
        response: response.docs[0].data(),
        id: id,
      },
    });
  } catch {
    dispatch(push('/404'));
  }
};

export const remove = async id => {
  const response = await firebase.remove(`/news/${id}`);

  dispatch({
    type: types.DELETE_POST,
    payload: response.data(),
  });
};

export const clearPosts = () => ({
  type: types.CLEAR_POSTS,
});

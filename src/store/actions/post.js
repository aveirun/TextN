import firebase from '../../services/firebase';
import { dispatch } from '../index';
import * as types from '../types/post';
import { FORM_ERROR } from 'final-form';
import { push } from 'connected-react-router';

export const addPost = async post => {
  try {
    const response = await firebase.addPost(post);
    console.log(response);

    dispatch({ type: types.ADD_POST, payload: response.data });
  } catch (error) {
    console.log(error);
    return { [FORM_ERROR]: 'invalid form' };
  }
};

export const getPostByID = async id => {
  try {
    const response = await firebase.getPostByID(id);
    dispatch({
      type: types.GET_POST_BY_ID,
      payload: response.docs[0].data(),
    });
    dispatch(push('/news'));
  } catch {
    dispatch(push('/404'));
  }
};

export const getAll = async params => {
  try {
    const response = await firebase.getAll('/news', { params });
    dispatch({
      type: types.GET_ALL_POSTS,
      payload: {
        posts: response.data(),
        totalCount: +response.headers['x-total-count'],
      },
    });
  } catch {
    dispatch(clearPosts());
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

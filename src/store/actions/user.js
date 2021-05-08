import firebase from '../../services/firebase';
import { dispatch } from '../index';
import * as types from '../types/user';
import { FORM_ERROR } from 'final-form';
import { push } from 'connected-react-router';

export const login = async values => {
  try {
    const response = await firebase.login(values);
    const user = response.docs[0].data();
    console.log('action', user);
    if (!user) {
      return null;
    }
    dispatch({ type: types.USER__LOGIN_SUCCESS, user });
  } catch (error) {
    console.log(error);
    return { [FORM_ERROR]: 'invalid email or password' };
  }
};

export const register = async values => {
  try {
    const response = await firebase.register(values);
    const user = response.docs[0].data();
    dispatch({ type: types.USER__LOGIN_SUCCESS, user });
    dispatch(push('/profile'));
  } catch (error) {
    console.log(error);
    return { [FORM_ERROR]: 'invalid form' };
  }
};

export const logout = () => {
  dispatch({ type: types.USER__LOGOUT });
};

export const checkInitialized = async () => {
  try {
    const response = await firebase.isInitialized();

    if (!response) return null;

    const user = response.docs[0].data();
    dispatch({ type: types.USER__LOGIN_SUCCESS, user });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editProfile = async values => {
  try {
    await firebase.editProfile(values);
    dispatch({ type: types.USER__LOGIN_SUCCESS, user: values });
  } catch (error) {
    console.log(error);
    return { [FORM_ERROR]: 'invalid form' };
  }
};

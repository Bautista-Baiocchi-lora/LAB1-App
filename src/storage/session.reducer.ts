import {Reducer} from 'redux';
import {APP_ACTION, UserAction} from './storage.actions';

export interface SessionState {
  token: string;
  loading_token: boolean;
}

const initialState: SessionState = {
  token: null,
  loading_token: false,
};

export const sessionReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAction.LOG_IN:
      return {...state, token: action.data.token, loading_token: false};
    case APP_ACTION.LOAD:
      if (!!action.token) {
        return {...state, token: action.token, loading_token: false};
      }
      return initialState;
    case UserAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
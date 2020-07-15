import {fetchLotes} from '../requests/lotes.request';

export enum LoteAction {
  FINISHED_LOADING = 'save_lotes',
  CLEAR = 'clear_lotes',
  START_LOADING = 'loading_lotes',
}

export const getAllLotes = (token: string) => (dispatch) => {
  console.debug('Loading lotes');

  dispatch({type: LoteAction.START_LOADING, loading: true});

  return fetchLotes(token).then((allLotes) => {
    dispatch({type: LoteAction.FINISHED_LOADING, lotes: allLotes || []});
  });
};
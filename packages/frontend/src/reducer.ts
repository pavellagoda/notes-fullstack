import { StateValues } from './Store';
import { NoteItem } from '@notes/common';

interface Action<T = string, P = {}> {
  type: T;
  payload: P | null;
}

export type ListAction = Action<'GET_LIST', NoteItem[]>;
export type NoteAction = Action<'GET_NOTE', NoteItem>;
export type PutNoteAction = Action<'PUT_NOTE', NoteItem[]>;
export type PostNoteAction = Action<'POST_NOTE', NoteItem[]>;
export type DeleteNoteAction = Action<'DELETE_NOTE', NoteItem[]>;
export type ErrorAction = Action<'SET_ERROR', string>;

const Reducer = (
  state: StateValues,
  action: ListAction | NoteAction | ErrorAction | PutNoteAction | PostNoteAction | DeleteNoteAction,
): StateValues => {
  switch (action.type) {
    case 'GET_LIST':
      return {
        ...state,
        list: action.payload,
      };
    case 'GET_NOTE':
      return {
        ...state,
        note: action.payload,
      };

    case 'PUT_NOTE':
      return {
        ...state,
        list: action.payload,
      };

    case 'POST_NOTE':
      return {
        ...state,
        list: action.payload,
      };

    case 'DELETE_NOTE':
      return {
        ...state,
        list: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;

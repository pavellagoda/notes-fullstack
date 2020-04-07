import React, { createContext, Dispatch, useReducer } from 'react';
import Reducer, {
  ListAction,
  ErrorAction,
  NoteAction,
  PutNoteAction,
  PostNoteAction,
  DeleteNoteAction,
} from './reducer';
import { NoteItem } from '@notes/common';

export interface StateValues {
  list: NoteItem[] | null;
  error: string | null;
  note: NoteItem | Partial<NoteItem> | null;
}

const initialState: StateValues = {
  list: null,
  error: null,
  note: null,
};

const noop = (): void => undefined;

type ContextValues = [
  StateValues,
  Dispatch<
    ListAction | NoteAction | PutNoteAction | PostNoteAction | DeleteNoteAction | ErrorAction
  >,
];

export const Context = createContext<ContextValues>([initialState, noop]);

export const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

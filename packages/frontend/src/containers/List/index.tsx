import React, { useMemo, useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import useAxios from '@use-hooks/axios';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Context } from '../../Store';
import ListTable from './ListTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

const ListPage: React.FC = () => {
  const stylePadding = useMemo(() => ({ padding: '10px' }), []);
  const [state, dispatch] = useContext(Context);
  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);
  const classes = useStyles();
  const list = state.list ?? [];
  const { response, loading } = useAxios({
    url: '/api/notes',
    method: 'GET',
    trigger: 'true',
    forceDispatchEffect: () => !state.list && !state.error,
  });

  const { response: deleteResponse, loading: deleteLoading, reFetch } = useAxios({
    url: `/api/notes/${deleteNoteId}`,
    method: 'DELETE',
    trigger: 'true:)',
    forceDispatchEffect: () => !!deleteNoteId,
  });

  useEffect(() => {
    if (response && !loading) {
      dispatch({ type: 'GET_LIST', payload: response?.data });
    }
  }, [response, loading]);

  useEffect(() => {
    if (deleteResponse && !deleteLoading) {
      dispatch({ type: 'DELETE_NOTE', payload: deleteResponse?.data });
      setDeleteNoteId(null);
    }
  }, [deleteResponse, deleteLoading]);

  const handleDeleteNote = (id: number) => {
    setDeleteNoteId(id);
    reFetch();
  };

  return (
    <div style={stylePadding}>
      <ListTable list={list} handleDelete={handleDeleteNote} />
      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to={`/notes/add`}
        className={`${classes.fab} add-note-btn`}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ListPage;

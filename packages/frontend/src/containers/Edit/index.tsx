import React, { useMemo, useContext, useEffect, useState, useCallback } from 'react';
import useAxios from '@use-hooks/axios';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../../Store';

import Edit from './Edit';
import { NoteItem } from '@notes/common';

const EditPage: React.FC = () => {
  const stylePadding = useMemo(() => ({ padding: '10px' }), []);
  const [state, dispatch] = useContext(Context);
  const { note } = state;
  const { id } = useParams();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState(note);
  const { response, loading } = useAxios({
    url: `/api/notes/${id}`,
    method: 'GET',
    trigger: 'true',
    forceDispatchEffect: () => (!state.note && !state.error) || state.note?.id !== Number(id),
  });

  const { response: submitResponse, loading: submitLoading, reFetch } = useAxios({
    url: `/api/notes/${id}`,
    method: 'PUT',
    options: {
      data: formValues,
    },
    forceDispatchEffect: () => isSubmit,
  });

  useEffect(() => {
    if (response && !loading) {
      dispatch({ type: 'GET_NOTE', payload: response?.data });
    }
  }, [response, loading]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'GET_NOTE', payload: null });
    };
  }, []);

  useEffect(() => {
    if (submitResponse && !submitLoading) {
      dispatch({ type: 'PUT_NOTE', payload: submitResponse?.data });
      history.push('/');
    }
  }, [submitResponse, submitLoading]);

  const handleSubmit = useCallback(
    (value: NoteItem | Partial<NoteItem>) => {
      setFormValues({ ...note, ...value });
      setIsSubmit(true);
      reFetch();
    },
    [note, reFetch],
  );

  if (!note) {
    return null;
  }
  return (
    <div style={stylePadding}>
      <Edit note={note} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditPage;

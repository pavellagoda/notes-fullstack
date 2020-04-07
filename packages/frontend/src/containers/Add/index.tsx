import React, { useMemo, useContext, useEffect, useState, useCallback } from 'react';
import useAxios from '@use-hooks/axios';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Store';

import Add from './Add';
import { NoteItem } from '@notes/common';

const AddPage: React.FC = () => {
  const stylePadding = useMemo(() => ({ padding: '10px' }), []);
  const [, dispatch] = useContext(Context);
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState({});

  const { response, loading, reFetch } = useAxios({
    url: `/api/notes`,
    method: 'POST',
    options: {
      data: formValues,
    },
    forceDispatchEffect: () => isSubmit,
  });

  useEffect(() => {
    if (response && !loading) {
      dispatch({ type: 'POST_NOTE', payload: response?.data });
      history.push('/');
    }
  }, [response, loading]);

  const handleSubmit = useCallback(
    (value: Partial<NoteItem>) => {
      setFormValues(value);
      setIsSubmit(true);
      reFetch();
    },
    [reFetch],
  );

  return (
    <div style={stylePadding}>
      <Add note={{}} handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPage;

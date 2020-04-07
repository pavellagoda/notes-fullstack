import React, { useMemo, useContext, useEffect } from 'react';
import useAxios from '@use-hooks/axios';
import { useParams } from 'react-router-dom';
import { Context } from '../../Store';

import View from './View';

const ViewPage: React.FC = () => {
  const stylePadding = useMemo(() => ({ padding: '10px' }), []);
  const [state, dispatch] = useContext(Context);
  const { note } = state;
  const { id } = useParams();
  const { response, loading } = useAxios({
    url: `/api/notes/${id}`,
    method: 'GET',
    trigger: 'true:)',
    forceDispatchEffect: () => (!state.note && !state.error) || state.note?.id !== Number(id),
  });

  useEffect(() => {
    if (response && !loading) {
      dispatch({ type: 'GET_NOTE', payload: response?.data });
    }
  }, [response, loading]);

  if (!note) {
    return null;
  }

  return (
    <div style={stylePadding}>
      <View note={note} />
    </div>
  );
};

export default ViewPage;

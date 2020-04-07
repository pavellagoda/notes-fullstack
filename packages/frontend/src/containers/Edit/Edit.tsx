import React from 'react';
import { Link } from 'react-router-dom';
import { NoteItem } from '@notes/common';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import { NoteForm } from '../../components/NoteForm';
import ArrowBack from '@material-ui/icons/ArrowBack';

type EditProps = {
  note: NoteItem | Partial<NoteItem>;
  handleSubmit: (value: NoteItem | Partial<NoteItem>) => void;
};

const Edit = ({ note, handleSubmit }: EditProps) => {
  return (
    <Grid justify="center" container>
      <Grid xs={12} md={6} item>
        <Paper style={{ marginTop: 16, padding: 20 }}>
          <div>
            <IconButton aria-label="edit" className="back-btn" component={Link} to={`/`}>
              <ArrowBack />
            </IconButton>
          </div>
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Edit Note
          </Typography>
          <NoteForm note={note} handleSubmit={handleSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Edit;

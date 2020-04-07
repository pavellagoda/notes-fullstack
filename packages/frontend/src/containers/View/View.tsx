import React from 'react';
import { Link } from 'react-router-dom';
import { NoteItem } from '@notes/common';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

type ViewProps = {
  note: NoteItem | Partial<NoteItem>;
};

const View = ({ note }: ViewProps) => {
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
            Note Details
          </Typography>
          {note.content}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default View;

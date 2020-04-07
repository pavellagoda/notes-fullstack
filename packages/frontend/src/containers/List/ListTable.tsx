import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  Card,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { NoteItem } from '@notes/common';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type ListProps = {
  list: NoteItem[];
  handleDelete: (id: number) => void;
};

const ListTable = ({ list, handleDelete }: ListProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.root} spacing={2}>
      {list.map((note) => {
        return (
          <Grid
            item
            xs={12}
            md={4}
            key={`note-${note.id}`}
            className={`note-list-item note-list-item-${note.id}`}>
            <Card>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {note.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/notes/${note.id}/view`}>
                  {t('readMore')}
                </Button>
                <IconButton
                  aria-label="edit"
                  className="edit-note-btn"
                  component={Link}
                  to={`/notes/${note.id}/edit`}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className="delete-note-btn"
                  onClick={() => handleDelete(note.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ListTable;

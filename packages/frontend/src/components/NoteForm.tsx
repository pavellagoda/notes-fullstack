import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button } from '@material-ui/core';
import { FieldError } from './FieldError';
import { NoteItem } from '@notes/common';
import { useTranslation } from 'react-i18next';

type Props = {
  note: NoteItem | Partial<NoteItem>;
  handleSubmit: (value: NoteItem | Partial<NoteItem>) => void;
};

export const NoteForm: React.FC<Props> = ({ note = { content: '' }, handleSubmit }: Props) => {
  const { register, handleSubmit: formSubmit, errors } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data: Partial<NoteItem>): void => {
    handleSubmit({
      ...note,
      ...data,
    });
  };
  return (
    <form onSubmit={formSubmit(onSubmit)}>
      <Grid xs={12} item>
        <TextField
          error={!!errors.content}
          helperText={<FieldError error={errors.content} />}
          label="Content"
          multiline
          defaultValue={note.content}
          rows="8"
          name="content"
          fullWidth
          inputRef={register({ required: 'Field is required' })}
        />
      </Grid>
      <Grid container style={{ marginTop: 16 }} justify="center">
        <Button variant="contained" color="primary" type="submit">
          {t('save')}
        </Button>
      </Grid>
    </form>
  );
};

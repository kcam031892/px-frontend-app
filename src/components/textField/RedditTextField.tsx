import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'hidden',
      padding: '0px 5px',
      borderRadius: 2,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {},
      '&$focused': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      },
    },
    focused: {},
  }),
);

export default function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />;
}

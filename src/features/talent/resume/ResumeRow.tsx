import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ResumeMediaIcon, DeleteIcon, MoveIcon } from '../../../components/icon';
import { RedditTextField } from '../../../components/textField';
import { ResumeTextItem } from './ResumeTypes';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionContainer: {
      width: 120,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '16px',
      '& svg': {
        width: 16,
        height: 16,
        marginLeft: 16,
        cursor: 'pointer',
      },
      '& .MuiButtonBase-root': {
        padding: '0',
      },
    },
  }),
);

export interface ResumeRowProps {
  id: any;
  index: number;
  columns: number;
  values: ResumeTextItem[];
  dragableHandler: any;
  onCellChange: (value: string, colum: number) => void;
  onDeleteRow: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ResumeRow = (props: ResumeRowProps) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {[...Array(props.columns)].map((e, i) => {
          return (
            <Grid item xs>
              <RedditTextField
                fullWidth
                value={props.values.find((x) => x.columnIndex === i)?.text || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.stopPropagation();
                  if (props.onCellChange !== null) props.onCellChange((event.target as HTMLInputElement).value, i);
                }}
              />
            </Grid>
          );
        })}
        <Grid className={classes.actionContainer}>
          <IconButton disabled={true}>
            <ResumeMediaIcon viewBox="0 0 16 16" style={{ width: 16, height: 16, marginTop: '7px' }} />
          </IconButton>

          <div {...props.dragableHandler}>
            <IconButton>
              <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
            </IconButton>
          </div>
          <IconButton
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              if (props.onDeleteRow !== null) props.onDeleteRow();
            }}
          >
            <DeleteIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

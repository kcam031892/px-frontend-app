import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { UpIcon, DownIcon, DeleteIcon } from '../../../components/Icons';

import { ResumeSection, ResumeSectionAction, ResumeSectionType, Direction } from './ResumeTypes';
import ResumeParagraph from './ResumeParagraph';
import ResumeTable from './ResumeTable';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { Range } from '../../../utils/array';
import { grey } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      border: '1px solid #D9D9D9',
      boxSizing: 'border-box',
      borderRadius: '4px',
    },
    resumeSection: {
      border: '1px solid #D9D9D9',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: '#FFFFFF',
      padding: '24px',
      marginBottom: '16px',
      position: 'relative',
      overflow: 'visible',
      '&:hover': {
        outline: '2px solid #A4A4A4',
      },
    },
    selectedResumeSection: {
      outline: '2px solid #A4A4A4',
    },
    actionContainer: {
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '8px',
      height: '48px',
      padding: '14px 18px',
      position: 'absolute',
      right: '-16px',
      top: '-56px',
      display: 'none',
      '& svg': {
        cursor: 'pointer',
      },
    },
    actionContainerSelected: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    actionContainerItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    actionContainerLong: {
      width: '418px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 500,
      marginBottom: '19px',
      '&.Mui-focused': {
        border: 'solid 1px #2962FF',
        borderRadius: 6,
        paddingLeft: 10,
      },
    },
    select: {
      width: '90px',
      background: 'white',
      fontSize: '14px',
      paddingLeft: 14,
      borderRadius: '4px',
      '&:hover': {
        borderColor: grey[400],
      },
      '&:focus': {
        borderRadius: '4px',
        background: 'white',
        borderColor: blue[200],
      },
    },
  }),
);

export type ResumeSectionState = {
  selected: boolean;
  onSectionClick: any;
  children?: any;
} & ResumeSection &
  ResumeSectionAction;

export const ResumeSectionComponent: React.FC<ResumeSectionState> = (props: ResumeSectionState) => {
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={clsx(classes.card, classes.resumeSection, {
        [classes.selectedResumeSection]: props.selected,
      })}
      onClick={(e: React.MouseEvent) => {
        if (typeof props.onSectionClick === 'function') props.onSectionClick(props.sectionId);
      }}
    >
      <CardContent>
        <InputBase
          fullWidth
          placeholder="Enter title here ..."
          value={props.title}
          className={classes.sectionTitle}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            props.onChangeTitle(event.target.value);
          }}
        />
        <Box>
          {props.sectionType === ResumeSectionType.TextArea && (
            <ResumeParagraph
              content={props.paragraphText || ''}
              onCellChange={props.onChangeText}
              sectionId={props.sectionType}
            />
          )}
          {props.sectionType !== ResumeSectionType.TextArea && (
            <ResumeTable
              rows={props.rowCount || 3}
              columns={props.columnCount || 4}
              onCellChange={props.onChangeText}
              onDeleteRow={props.onDeleteTableRow}
              onReOrderRow={props.onReorderTableRow}
              textItems={props.texts || []}
            />
          )}
        </Box>
        <Box
          className={clsx(classes.actionContainer, {
            [classes.actionContainerSelected]: props.selected,
            [classes.actionContainerLong]: props.sectionType !== ResumeSectionType.TextArea,
          })}
        >
          {props.sectionType !== ResumeSectionType.TextArea && (
            <div className={classes.actionContainerItem} style={{ width: 270, marginRight: '12px' }}>
              <Select
                id="demo-simple-select"
                disableUnderline
                value={props.rowCount}
                classes={{ root: classes.select }}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  props.onChangeTableConfig(event.target.value as number, props.columnCount || 4);
                }}
              >
                {Range(2, 10).map((x) => {
                  return <MenuItem value={x}>{x} Rows</MenuItem>;
                })}
              </Select>
              <Select
                id="demo-simple-select"
                disableUnderline
                value={props.columnCount}
                classes={{ root: classes.select }}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  props.onChangeTableConfig(props.rowCount || 3, event.target.value as number);
                }}
              >
                {Range(2, 6).map((x) => {
                  return <MenuItem value={x}>{x} Columns</MenuItem>;
                })}
              </Select>
            </div>
          )}
          <div className={classes.actionContainerItem} style={{ width: 90, marginRight: '12px' }}>
            <IconButton
              disabled={true}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof props.onReOrder === 'function') props.onReOrder(Direction.Down);
              }}
            >
              <DownIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DownIcon>
            </IconButton>
            <IconButton
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof props.onReOrder === 'function') props.onReOrder(Direction.Up);
              }}
            >
              <UpIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></UpIcon>
            </IconButton>
            <IconButton
              disabled={true}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof props.onRemove === 'function') props.onRemove();
              }}
            >
              <DeleteIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DeleteIcon>
            </IconButton>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

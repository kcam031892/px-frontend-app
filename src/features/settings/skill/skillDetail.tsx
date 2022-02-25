import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SkillGroup, SkillItem } from './skillTypes';
import Typography from '@material-ui/core/Typography';
import { SkillLevel, SelectListItem } from '../../../types';
import { EnumToMap } from '../../../utils/enumUtil';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Select } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skillItem: {
      marginTop: theme.spacing(5),
    },
    skillItemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addMediaButton: {
      height: '40px',
      marginLeft: theme.spacing(2),
    },
    levelSelect: {
      width: '144px',
      backgroundImage: '#f3f3f3',
    },
    skillNoMedia: {
      boxShadow: 'inset 0px -1px 0px #E1E1E1',
      border: 'solid 1px',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
      color: '#A4A4A4',
      height: '48px',
      padding: '16px',
      marginTop: '16px',
      borderRadius: '4px',
    },
  }),
);

export interface SkillDetailProps {
  group: SkillGroup;
  onChangeSkillLevel: (groupId: number, itemId: number, level: SkillLevel) => void;
}

export const SkillDetail = (props: SkillDetailProps) => {
  const classes = useStyles();
  const selectedItems = props.group.items.filter((x) => x.selected);

  return (
    <>
      {selectedItems.map((item: SkillItem, index: number) => {
        return (
          <Box className={classes.skillItem} key={index}>
            <Box className={classes.skillItemHeader}>
              <Typography variant="h6">{item.name}</Typography>
              <Box>
                <Select
                  value={item.level || SkillLevel.Basic}
                  disableUnderline
                  className={classes.levelSelect}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                    props.onChangeSkillLevel(props.group.id, item.id, event.target.value as SkillLevel)
                  }
                >
                  {EnumToMap(SkillLevel).map((item: SelectListItem) => {
                    return (
                      <MenuItem key={item.value} value={item.value}>
                        {item.text}
                      </MenuItem>
                    );
                  })}
                </Select>

                <Button variant="outlined" disableElevation className={classes.addMediaButton} disabled>
                  Add media
                </Button>
              </Box>
            </Box>
            <Box className={classes.skillNoMedia}>No meida added yet</Box>
          </Box>
        );
      })}
    </>
  );
};

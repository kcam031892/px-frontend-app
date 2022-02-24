import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Checkbox from '@material-ui/core/Checkbox';
import { EthnicityGroup, EthnicityItem } from './statsTypes';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { BackIcon } from '../../../components/icon';
export interface EthnicityialogProps {
  open: boolean;
  onClose: () => void;
  onClearGroupItems: (group: string) => void;
  onChangeItemStatus: (checked: boolean, group: string, itemCode: string) => void;
  onApplyChanges: () => void;
  ethnicities: EthnicityGroup[];
}

const useStyles = makeStyles({
  list: {
    width: '343px',
    '& .MuiListItem-container': {
      padding: '10px 32px',
    },
  },
  arrowIcon: {
    fontSize: '1rem',
  },
  hidden: {
    display: 'none',
  },
});

function EthnicityDialog(props: EthnicityialogProps) {
  const classes = useStyles();
  const [showSubType, setShowSubType] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState<string>('');
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
    setShowSubType(false);
  };

  const currentGroup: EthnicityGroup = props.ethnicities?.find((x) => x.text === currentGroupName) || {
    text: '',
    items: [],
  };

  const showGroup = (group: EthnicityGroup) => {
    setCurrentGroupName(group.text);
    setShowSubType(true);
  };

  const getEthnicityText = (group: EthnicityGroup) => {
    if (group.items.length === 1) {
      return group.items[0].text;
    }
    const selectedValues = group.items.filter((x) => x.selected) || [];
    return (
      <div>
        {group.text} <br />
        {selectedValues.length} subtypes selected
      </div>
    );
  };

  const getDialogTitle = () => {
    if (showSubType) {
      return (
        <div>
          <BackIcon
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ width: 16, height: 16, marginRight: '18px', cursor: 'pointer' }}
            onClick={() => handleBackToList()}
          ></BackIcon>
          <span>{currentGroup?.text} subtypes</span>
        </div>
      );
    }
    return 'Select Ethnicities';
  };

  const handleClearGroupSelectedItems = (group: EthnicityGroup | undefined) => {
    if (group) {
      props.onClearGroupItems(group?.text);
    }
  };

  const handleBackToList = () => {
    setShowSubType(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{getDialogTitle()}</DialogTitle>
      <DialogContent>
        <div
          className={clsx(null, {
            [classes.hidden]: showSubType,
          })}
        >
          <span>Ethnicity groups</span>
          <List dense classes={{ root: classes.list }}>
            {props.ethnicities &&
              props.ethnicities.map((group: EthnicityGroup) => {
                return (
                  <ListItem key={group.text} button onClick={() => showGroup(group)}>
                    <ListItemText primary={getEthnicityText(group)} />
                    <ListItemSecondaryAction>
                      {group.items.length === 1 && (
                        <Checkbox
                          edge="end"
                          checked={group.items[0].selected}
                          color="default"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            props.onChangeItemStatus(event.target.checked, group.text, group.items[0].code)
                          }
                        />
                      )}
                      {group.items.length > 1 && (
                        <ArrowForwardIosIcon className={classes.arrowIcon} onClick={() => showGroup(group)}>
                          {' '}
                        </ArrowForwardIosIcon>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        </div>
        <div className={clsx(null, { [classes.hidden]: !showSubType })}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedF"
                indeterminate
                color="default"
                checked={true}
                onClick={() => handleClearGroupSelectedItems(currentGroup)}
              />
            }
            label="Select none"
          />
          <Grid container spacing={2}>
            {currentGroup &&
              currentGroup.items.map((item: EthnicityItem) => {
                return (
                  <Grid xs={12} md={6} item key={item.code}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedC"
                          checked={item.selected}
                          color="default"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            props.onChangeItemStatus(event.target.checked, currentGroup.text, item.code)
                          }
                        />
                      }
                      label={item.text}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ background: '#2962FF' }}
          onClick={() => {
            props.onApplyChanges();
            handleClose();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EthnicityDialog;

import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../app/appSlice';
import { RootState } from '../../../app/rootReducer';
import { changeSocialLink, changeSocialVisible, fetchSocial } from './socialSlice';
import { MySocialState, SocialModel, Socials, SocialTypeCode } from './socialTypes';
import clsx from 'clsx';
import { postSocial } from '../../../api/myAccount';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    socialIcon: {
      width: 32,
      height: 32,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      marginRight: 16,
    },
    inVisibleText: {
      color: '#A4A4A4',
    },
    linkCell: {
      cursor: 'pointer',
    },
  }),
);

export default function Social() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSocialCode, setEditSocialCode] = useState(SocialTypeCode.NONE);
  const [editLink, setEditLink] = useState('');
  const appState: AppState = useSelector((state: RootState) => state.app);

  const social: MySocialState = useSelector((state: RootState) => state.social);

  useEffect(() => {
    dispatch(fetchSocial(appState.memberId));
  }, [appState.memberId, dispatch]);

  const postSocialUpdate = (model: SocialModel) => {
    postSocial(appState.memberId, model);
  };

  const handleVisibleChange = (code: SocialTypeCode, visible: boolean) => {
    dispatch(changeSocialVisible({ code, visible }));
    const currentSocial = social.models.find((x) => x.socialTypeCode === code) || {
      show: false,
      link: '',
      socialTypeCode: SocialTypeCode.NONE,
    };
    postSocialUpdate({ ...currentSocial, show: visible });
  };

  const handleLinkChange = (code: SocialTypeCode, link: string) => {
    dispatch(changeSocialLink({ code, link }));
    const currentSocial = social.models.find((x) => x.socialTypeCode === code) || {
      show: false,
      link: '',
      socialTypeCode: SocialTypeCode.NONE,
    };
    postSocialUpdate({ ...currentSocial, link: link });
  };
  return (
    <Box mt={3}>
      <Grid container spacing={4}>
        <Grid item xs={10}>
          <Typography variant="h6">Connect Social Media Accounts</Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Platform</TableCell>
                    <TableCell align="right">Account</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Socials.map((row) => {
                    const currentSocial = social.models.find((x) => x.socialTypeCode === row.code) || {
                      show: false,
                      link: '',
                      socialTypeCode: SocialTypeCode.NONE,
                    };
                    return (
                      <TableRow key={row.name}>
                        <TableCell>
                          <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              style={{ backgroundImage: "url('/" + row.logo + "'" }}
                              className={classes.socialIcon}
                            ></Box>
                            <Typography
                              variant="h6"
                              style={{ fontSize: 18 }}
                              className={clsx(null, {
                                [classes.inVisibleText]: !currentSocial.show,
                              })}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={clsx(classes.linkCell, {
                            [classes.inVisibleText]: !currentSocial.show,
                          })}
                          onClick={() => {
                            setEditLink(currentSocial.link);
                            setEditSocialCode(currentSocial.socialTypeCode);
                            setEditDialogOpen(true);
                          }}
                        >
                          {currentSocial.link || 'add your url here'}
                        </TableCell>
                        <TableCell align="right">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={currentSocial?.show || false}
                                onChange={() => handleVisibleChange(row.code, !currentSocial.show)}
                                name={'switch' + row.code}
                              />
                            }
                            label="Show"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Account Link</DialogTitle>
        <DialogContent style={{ width: 600 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            value={editLink}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditLink((event.target as HTMLInputElement).value);
            }}
            fullWidth
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleLinkChange(editSocialCode, editLink);
              setEditDialogOpen(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

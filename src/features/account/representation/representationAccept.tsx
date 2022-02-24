import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FrontLayout from '..';
import { RootState } from '../../../app/rootReducer';
import { acceptPresentationRequest } from '../accountSlice';
import { AccountState } from '../accountTypes';

export function RepresentationAccept() {
  const { requestId } = useParams() as { requestId: string };
  const dispatch = useDispatch();
  const accountState: AccountState = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(acceptPresentationRequest(requestId as string));
    // eslint-disable-next-line
  }, []);

  return (
    <FrontLayout title1={'Representation was successfully approved'} title2={' '} containerWidth={600}>
      <br />
      <Typography>
        Thank you for verifying your representation of{' '}
        <b>
          {accountState.representationRequest?.firstName} {accountState.representationRequest?.lastName}{' '}
        </b>
        .
      </Typography>
      <br />
      <Typography variant="body2">
        {accountState.representationRequest?.firstName} has now been successfully approved as a represented talent under
        your agency/management <b>{accountState.representationRequest?.agencyName} </b> .
      </Typography>
      <br />
      <Typography variant="body2">
        They will be notified by email and changes are also now reflected on their online profile inside auditionmagic
        as well.
      </Typography>
      <Box style={{ marginTop: 16 }}>
        <Button variant="contained" disableElevation fullWidth component={Link} to={'/login'}>
          Back to Log In
        </Button>
      </Box>
    </FrontLayout>
  );
}

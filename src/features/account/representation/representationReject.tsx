import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FrontLayout from '..';
import { RootState } from '../../../app/rootReducer';
import { denyPresentationRequest } from '../accountSlice';
import { AccountState } from '../accountTypes';

export function RepresentationReject() {
  const { requestId } = useParams() as { requestId: string };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(denyPresentationRequest(requestId as string));
    // eslint-disable-next-line
  }, []);
  const accountState: AccountState = useSelector((state: RootState) => state.account);
  return (
    <FrontLayout title1={'Representation denied for this talent'} title2={' '} containerWidth={600}>
      <br />
      <Typography>
        You have denied this representation request of{' '}
        <b>
          {accountState.representationRequest?.firstName} {accountState.representationRequest?.lastName}{' '}
        </b>
        .
      </Typography>
      <br />
      <Typography variant="body2">
        {accountState.representationRequest?.firstName} will now be changed back to freelance status or remain linked to
        his current agency. {accountState.representationRequest?.firstName} will <b>NOT</b> be listed under your
        agency/management <b>{accountState.representationRequest?.agencyName} </b> .
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

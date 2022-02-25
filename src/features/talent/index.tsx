import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileState } from './profileTypes';
import { RootState } from '../../app/rootReducer';
import { ProfileList } from './profileList';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfileIndex from './profileIndex';

export default function Talent() {
  const profile: ProfileState = useSelector((state: RootState) => state.profile);

  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ProfileList profiles={profile.profiles}></ProfileList>
        </Route>
        <Route path={`${path}/:profileId`}>
          <ProfileIndex profileId={0}></ProfileIndex>
        </Route>
      </Switch>
    </>
  );
}

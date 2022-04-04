import { Card, CardContent, CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useStyles } from './ProfileSkeleton.styles';

const ProfileSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" className={classes.card__profileFalgSkeleton} height={24} width={50} />
      <CardMedia className={classes.card__media}>
        <Skeleton animation="wave" variant="circle" className={classes.card__media__skeleton} />
      </CardMedia>
      <CardContent className={classes.card__content}>
        <Skeleton height={24} width={'80%'} animation="wave" />
        <Skeleton height={12} width={'80%'} animation="wave" />
        <Skeleton className={classes.card__content__actionSkeleton} height={16} width={16} />
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;

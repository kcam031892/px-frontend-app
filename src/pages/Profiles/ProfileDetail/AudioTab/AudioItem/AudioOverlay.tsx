import { Card, IconButton, Box, CardMedia, CardContent, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { MoveIcon } from 'components/Icons';
import React, { forwardRef } from 'react';
import { IProfileMedia } from 'shared/interfaces/IProfile';
import { formatBytes } from 'shared/utils/formatBytes';
import { useStyles } from './AudioItem.styles';

type Props = {
  item: IProfileMedia;
};
const AudioOverlay = forwardRef<any, Props>(({ item }, ref) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} ref={ref}>
      <div className={classes.card__moveIcon}>
        <IconButton>
          <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
        </IconButton>
      </div>

      <Box className={classes.card__media}>
        <CardMedia
          component="img"
          image="/audio-background.png"
          title="Live from space album cover"
          height="250"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent className={classes.card__content}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {item.attributes.medium_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {formatBytes(item.attributes.medium_size)}
          </Typography>

          <Typography variant="caption" className={classes.card__caption}>
            {item.attributes.primary ? 'Primary' : 'Selected'}
          </Typography>
        </Box>
      </CardContent>
      <Box className={classes.card__actions}>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>
    </Card>
  );
});

export default AudioOverlay;

import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import { MoveIcon } from 'components/Icons';
import React, { forwardRef } from 'react';
import { IProfileMedia } from 'shared/interfaces/IProfile';
import { useStyles } from './ImageItem.styles';

type Props = {
  item: IProfileMedia;
};
const ImageOverlay = forwardRef<any, Props>(({ item }, ref) => {
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
          image={item.attributes.attachment}
          title={item.attributes.medium_name}
          height="300"
          width="100%"
          style={{ objectFit: 'contain', maxHeight: 300 }}
        />
      </Box>

      <CardContent className={classes.card__content}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {item.attributes.medium_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {`${Math.floor(item.attributes.medium_width)}x${Math.floor(item.attributes.medium_height)}`}
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

export default ImageOverlay;

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
        <IconButton color="primary" style={{ background: '#fff', padding: 8 }}>
          <MoveIcon viewBox="0 0 16 16" style={{ width: 12, height: 12 }} />
        </IconButton>
      </div>
      <Box className={classes.card__media}>
        <CardMedia
          component="img"
          image={item.attributes.attachment}
          title={item.attributes.medium_name}
          alt=""
          height={150}
          width={'100%'}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Box className={classes.card__actions}>
        <IconButton style={{ background: '#fff', padding: 6 }}>
          <MoreVert style={{ width: 16, height: 16 }} />
        </IconButton>
      </Box>
    </Card>
  );
});

export default ImageOverlay;

import { Box, Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './ImageGalleryItem.styles';

type Props = {
  isSelected?: boolean;
};
const ImageGalleryItem: React.FC<Props> = ({ isSelected }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.card, {
        [classes.card__active]: isSelected,
      })}
    >
      <Box className={classes.card__media}>
        <CardMedia src="https://picsum.photos/200/300" style={{ objectFit: 'cover' }} height="250" component="img" />
      </Box>
      <CardContent>
        <Typography variant="h6">Sample Text</Typography>
        <Typography variant="caption">2000x2000</Typography>
        {isSelected && (
          <Box mt={2}>
            <Button variant="contained" color="secondary" fullWidth>
              Selected
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGalleryItem;

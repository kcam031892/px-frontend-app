import { Box, Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import IMedia from 'shared/interfaces/IMedia';
import { useStyles } from './ImageGalleryItem.styles';

type Props = {
  isSelected?: boolean;
  item: IMedia;
  handleSelectedMedia: (media: IMedia) => void;
};
const ImageGalleryItem: React.FC<Props> = ({ isSelected, item, handleSelectedMedia }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.card, {
        [classes.card__active]: isSelected,
      })}
      onClick={() => handleSelectedMedia(item)}
    >
      <Box className={classes.card__media}>
        <CardMedia src={item.attributes.attachment_url} style={{ objectFit: 'cover' }} height="250" component="img" />
      </Box>
      <CardContent>
        <Typography variant="h6">{item.attributes.file_name}</Typography>
        <Typography variant="caption">{`${item.attributes.file_width}x${item.attributes.file_height}`} </Typography>
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

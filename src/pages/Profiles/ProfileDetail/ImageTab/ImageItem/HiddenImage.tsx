import { Card, IconButton, Box, CardMedia, CardContent, Typography, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import IMedia from 'shared/interfaces/IMedia';
import { IProfileMediaSetSelectPayload } from 'shared/interfaces/IProfile';

import { useStyles } from './ImageItem.styles';

type Props = {
  handleEditImage: () => void;
  item: IMedia;
  handleSetSelect: (payload: IProfileMediaSetSelectPayload) => void;
};
const HiddenImage: React.FC<Props> = ({ item, handleEditImage, handleSetSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    handleEditImage();
    handleCloseMenu();
  };

  const handleSelectImage = () => {
    handleSetSelect({
      medium_id: item.id,
    });
  };

  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, [classes.card__hideImage])}>
      <Box className={classes.card__media}>
        <CardMedia
          component="img"
          image={item.attributes.attachment_url}
          title={item.attributes.file_name}
          height="250"
          width="100%"
          style={{ objectFit: 'contain', maxHeight: 250 }}
        />
      </Box>

      <CardContent className={classes.card__content}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {item.attributes.file_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {`${item.attributes.file_width}x${item.attributes.file_height}`}
          </Typography>
        </Box>
        <Box className={classes.card__actions}>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                width: 256,
              },
            }}
          >
            <MenuItem style={{ height: 40 }} onClick={() => handleSelectImage()}>
              Select Image
            </MenuItem>
            <MenuItem onClick={() => handleEdit()}>Edit Image</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HiddenImage;

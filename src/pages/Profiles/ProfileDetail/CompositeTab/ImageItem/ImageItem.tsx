import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import { useStyles } from './ImageItem.styles';

type Props = {
  src: string;
  index: number;
  selectedImage: number;
  handleSelectedImage: (index: number) => void;
};
const ImageItem: React.FC<Props> = ({ src, index, selectedImage, handleSelectedImage }) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (selectedImage !== index) {
      handleSelectedImage(index);
    } else {
      handleSelectedImage(-1);
    }
  };
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.imageItem, {
        [classes.imageItem__isSelected]: index === selectedImage,
      })}
      onClick={handleClick}
    >
      <img src={src} />
    </Box>
  );
};

export default ImageItem;

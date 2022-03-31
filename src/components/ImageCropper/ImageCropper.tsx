import { Box, Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { CropIcon, FlipIcon, ResetIcon, RotateLeftIcon, RotateRightIcon } from 'components/Icons';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import { ImageQuanlityLevel } from 'shared/enums/ImageQualityLevel';
import { ImageSlider } from 'themes/elements';

import { useStyles } from './ImageCropper.styles';

const standardHeightPixel = 1500;
const standardWidthPixel = 1125;
const rejectWidthQuanlity = 600;
const rejectHeightQuanlity = 800;
const acceptWidthQuanlity = 1125;
const acceptHeightQuanlity = 1500;

type Props = {
  src: string;
  cropper: any;
  setCropper: (instance: any) => void;
  handleCrop: () => void;
  qualityLevel: ImageQuanlityLevel;
  setQualityLevel: (level: ImageQuanlityLevel) => void;
};
const ImageCropper: React.FC<Props> = ({ src, cropper, setCropper, handleCrop, setQualityLevel, qualityLevel }) => {
  const classes = useStyles();
  const [minZoomRatio, setMinZoomRatio] = useState(0);
  const [maxZoomRatio, setMaxZoomRatio] = useState(1);
  const [imageData, setImageData] = useState<Cropper.ImageData | undefined>(undefined);

  const [sliderDefaultValue, setSliderDefaultValue] = useState<number>(0.2);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number;
    setSliderDefaultValue(valueNumber);
    cropper.zoomTo(valueNumber);
  };

  const handleImageReady = (e: Cropper.ReadyEvent<HTMLImageElement>) => {
    const imageData = e.currentTarget.cropper.getImageData();
    const minSliderZoom = imageData.width / imageData.naturalWidth;
    const maxSliderZoom =
      Math.min.apply([imageData.naturalWidth / standardWidthPixel, imageData.naturalHeight / standardHeightPixel]) || 1;

    setMaxZoomRatio(maxSliderZoom);
    setMinZoomRatio(minSliderZoom);
    setImageData(imageData);

    if (imageData.naturalWidth < rejectWidthQuanlity || imageData.naturalHeight < rejectHeightQuanlity) {
      setQualityLevel(ImageQuanlityLevel.Reject);
      // setErrorSnackbarOpen(true);
    } else if (imageData.naturalWidth < acceptWidthQuanlity || imageData.naturalHeight < acceptHeightQuanlity) {
      setQualityLevel(ImageQuanlityLevel.Bad);
      // setWarningSnackbarOpen(true);
    } else {
      setQualityLevel(ImageQuanlityLevel.Accept);
    }
  };

  const handleReset = () => {
    cropper.reset();
  };

  const handleFlip = () => {
    const cropperData = cropper.getData();
    cropper.scaleX(-cropperData.scaleX);
  };

  const handleRotateRight = () => {
    cropper.rotate(45);
  };

  const handleRotateLeft = () => {
    cropper.rotate(-45);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cropperContainer}>
        <Cropper
          style={{ height: 440, width: '100%' }}
          zoomTo={0}
          preview=".img-preview"
          src={src}
          minCropBoxHeight={440}
          initialAspectRatio={0.75}
          aspectRatio={0.75}
          viewMode={1}
          guides={false}
          modal={true}
          autoCrop={true}
          responsive={true}
          background={false}
          wheelZoomRatio={0.1}
          cropBoxResizable={false}
          ready={handleImageReady}
          checkCrossOrigin={true}
          zoomOnWheel={true}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </CardContent>
      <CardActions className={classes.card__action}>
        <Box className={classes.action}>
          <IconButton
            aria-label="upload picture"
            disabled={qualityLevel === ImageQuanlityLevel.Reject}
            className={clsx(classes.action__buttonActive, {
              [classes.action__buttonDisable]: qualityLevel === ImageQuanlityLevel.Reject,
            })}
            onClick={handleReset}
          >
            <ResetIcon width="24" height="24" viewBox="0 0 24 24" />
            <span style={{ marginLeft: '5px', fontSize: '10px' }}>RESET</span>
          </IconButton>
        </Box>
        <Box className={classes.slider}>
          <ImageSlider
            key={'slider_' + src}
            min={minZoomRatio}
            step={0.0001}
            value={sliderDefaultValue}
            max={1}
            disabled={qualityLevel === ImageQuanlityLevel.Reject || maxZoomRatio <= minZoomRatio || !src}
            onChange={handleSliderChange}
          />
        </Box>
        <Box className={classes.action}>
          <IconButton
            aria-label="upload picture"
            disabled={qualityLevel === ImageQuanlityLevel.Reject}
            className={clsx(classes.action__buttonActive, {
              [classes.action__buttonDisable]: qualityLevel === ImageQuanlityLevel.Reject,
            })}
            onClick={handleCrop}
          >
            <CropIcon width="24" height="24" viewBox="0 0 24 24" />
          </IconButton>
          <IconButton
            aria-label="flip picture"
            disabled={qualityLevel === ImageQuanlityLevel.Reject}
            className={clsx(classes.action__buttonActive, {
              [classes.action__buttonDisable]: qualityLevel === ImageQuanlityLevel.Reject,
            })}
            onClick={handleFlip}
          >
            <FlipIcon width="24" height="24" viewBox="0 0 24 24" />
          </IconButton>
          <IconButton
            aria-label="rotate left picture"
            disabled={qualityLevel === ImageQuanlityLevel.Reject}
            className={clsx(classes.action__buttonActive, {
              [classes.action__buttonDisable]: qualityLevel === ImageQuanlityLevel.Reject,
            })}
            onClick={handleRotateLeft}
          >
            <RotateLeftIcon width="24" height="24" viewBox="0 0 24 24" />
          </IconButton>
          <IconButton
            aria-label="rotate right picture"
            disabled={qualityLevel === ImageQuanlityLevel.Reject}
            className={clsx(classes.action__buttonActive, {
              [classes.action__buttonDisable]: qualityLevel === ImageQuanlityLevel.Reject,
            })}
            onClick={handleRotateRight}
          >
            <RotateRightIcon width="24" height="24" viewBox="0 0 24 24" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ImageCropper;

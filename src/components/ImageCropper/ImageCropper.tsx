import { Box, Card, CardActions, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
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
  setIsValidImage: (bool: boolean) => void;
};
const ImageCropper: React.FC<Props> = ({ src, cropper, setCropper, setIsValidImage }) => {
  const classes = useStyles();
  const [minZoomRatio, setMinZoomRatio] = useState(0);
  const [maxZoomRatio, setMaxZoomRatio] = useState(1);
  const [imageData, setImageData] = useState<Cropper.ImageData | undefined>(undefined);

  const handleImageReady = (e: Cropper.ReadyEvent<HTMLImageElement>) => {
    const imageData = e.currentTarget.cropper.getImageData();
    const minSliderZoom = imageData.width / imageData.naturalWidth;
    const maxSliderZoom =
      Math.min.apply([imageData.naturalWidth / standardWidthPixel, imageData.naturalHeight / standardHeightPixel]) || 1;

    setMaxZoomRatio(maxSliderZoom);
    setMinZoomRatio(minSliderZoom);
    setImageData(imageData);

    // if (imageData.naturalWidth < rejectWidthQuanlity || imageData.naturalHeight < rejectHeightQuanlity) {
    //   setQuanlityLevel(ImageQuanlityLevel.Reject);
    //   setErrorSnackbarOpen(true);
    // } else if (imageData.naturalWidth < acceptWidthQuanlity || imageData.naturalHeight < acceptHeightQuanlity) {
    //   setQuanlityLevel(ImageQuanlityLevel.Bad);
    //   setWarningSnackbarOpen(true);
    // } else {
    //   setQuanlityLevel(ImageQuanlityLevel.Accept);
    // }
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Cropper
            key={src}
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
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ImageCropper;

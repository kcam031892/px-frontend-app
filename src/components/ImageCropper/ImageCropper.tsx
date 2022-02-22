import { Button, Card, Col, Row, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import { CardActions, CropperContainer, ImageCropperWrapper } from './ImageCropper.styled';
import 'cropperjs/dist/cropper.css';
import { RotateLeftOutlined, RotateRightOutlined, UndoOutlined } from '@ant-design/icons';
import { FlipIcon } from 'components/Icons';
import { Alert } from 'shared/theme/elements';

type Props = {
  src: string;
  cropper: any;
  setCropper: (instance: any) => void;
  setIsValidImage: (bool: boolean) => void;
};
const standardHeightPixel = 1500;
const standardWidthPixel = 1125;
const rejectWidthQuanlity = 600;
const rejectHeightQuanlity = 800;
const acceptWidthQuanlity = 1125;
const acceptHeightQuanlity = 1500;

const ImageCropper: React.FC<Props> = ({ src, cropper, setCropper, setIsValidImage }) => {
  const [image, setImage] = useState(src);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [minZoomRatio, setMinZoomRatio] = useState<number>(0);
  const [maxZoomRatio, setMaxZoomRatio] = useState<number>(1);
  const [cropData, setCropData] = useState('#');

  const handleSliderChange = (value: number) => {
    if (value <= minZoomRatio) {
      cropper.zoomTo(minZoomRatio);
    } else {
      setSliderValue(value);
      cropper.zoomTo(value);
    }
  };

  const handleRotateLeft = () => {
    cropper.rotate(-45);
  };

  const handleRotateRight = () => {
    cropper.rotate(45);
  };

  const handleReset = () => {
    cropper.reset();
  };

  const handleFlip = () => {
    const cropperData = cropper.getData();
    cropper.scaleX(-cropperData.scaleX);
  };

  const handleImageReady = (e: Cropper.ReadyEvent<HTMLImageElement>) => {
    const imageData = e.currentTarget.cropper.getImageData();
    const minSliderZoom = imageData.width / imageData.naturalWidth;
    const maxSliderZoom =
      Math.min.apply([imageData.naturalWidth / standardWidthPixel, imageData.naturalHeight / standardHeightPixel]) || 1;

    setMaxZoomRatio(maxSliderZoom);
    setMinZoomRatio(minSliderZoom);
    setSliderValue(minSliderZoom);

    if (imageData.naturalWidth < rejectWidthQuanlity || imageData.naturalHeight < rejectHeightQuanlity) {
      Alert.error(
        'Error',
        'The image you have selected/uploaded is below the 800 pixel size height requirement, you cannot use this image. Please select another image.',
      );
      setIsValidImage(false);
    } else if (imageData.naturalWidth < acceptWidthQuanlity || imageData.naturalHeight < acceptHeightQuanlity) {
      Alert.warning(
        'Warning',
        ` The image you have selected/uploaded is below the 1500 pixel size height requirement. You may proceed however
      quality will be compromised`,
      );
      setIsValidImage(true);
    } else {
      setIsValidImage(true);
    }
  };

  return (
    <ImageCropperWrapper>
      <Card>
        <CropperContainer>
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
        </CropperContainer>
        <CardActions>
          <Row gutter={16}>
            <Col span={6}>
              <Button icon={<UndoOutlined />} onClick={handleReset} disabled={!src} />
            </Col>
            <Col span={12}>
              <Slider
                tooltipVisible={false}
                min={minZoomRatio}
                max={1}
                onChange={handleSliderChange}
                disabled={maxZoomRatio <= minZoomRatio || !src}
                step={0.0001}
                defaultValue={sliderValue}
                value={sliderValue}
              />
            </Col>
            <Col span={6}>
              <Space size="small">
                <Button icon={<FlipIcon />} onClick={handleFlip} disabled={!src} />
                <Button icon={<RotateLeftOutlined />} onClick={handleRotateLeft} disabled={!src} />
                <Button icon={<RotateRightOutlined />} onClick={handleRotateRight} disabled={!src} />
              </Space>
            </Col>
          </Row>
        </CardActions>
      </Card>
    </ImageCropperWrapper>
  );
};

export default ImageCropper;

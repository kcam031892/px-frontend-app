import { Button, Card, Col, Row, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import { CardActions, CropperContainer, ImageCropperWrapper } from './ImageCropper.styled';
import 'cropperjs/dist/cropper.css';
import { RotateLeftOutlined, RotateRightOutlined, UndoOutlined } from '@ant-design/icons';
import { FlipIcon } from 'components/Icons';

type Props = {
  src: string;
  cropper: any;
  setCropper: (instance: any) => void;
};
const standardHeightPixel = 1500;
const standardWidthPixel = 1125;
const ImageCropper: React.FC<Props> = ({ src, cropper, setCropper }) => {
  const [image, setImage] = useState(src);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [minZoomRatio, setMinZoomRatio] = useState<number>(0);
  const [maxZoomRatio, setMaxZoomRatio] = useState<number>(1);
  const [cropData, setCropData] = useState('#');
  // const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSliderChange = (value: number) => {
    console.log(value, minZoomRatio);

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
    // setImageData(imageData);

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
              <Button icon={<UndoOutlined />} onClick={handleReset} />
            </Col>
            <Col span={12}>
              <Slider
                tooltipVisible={false}
                min={minZoomRatio}
                max={1}
                onChange={handleSliderChange}
                disabled={maxZoomRatio <= minZoomRatio}
                step={0.0001}
                defaultValue={sliderValue}
              />
            </Col>
            <Col span={6}>
              <Space size="small">
                <Button icon={<FlipIcon />} onClick={handleFlip} />
                <Button icon={<RotateLeftOutlined />} onClick={handleRotateLeft} />
                <Button icon={<RotateRightOutlined />} onClick={handleRotateRight} />
              </Space>
            </Col>
          </Row>
        </CardActions>
      </Card>
    </ImageCropperWrapper>
  );
};

export default ImageCropper;

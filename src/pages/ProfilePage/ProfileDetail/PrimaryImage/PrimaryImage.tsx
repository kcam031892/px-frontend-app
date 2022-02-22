import { InboxOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography, Upload } from 'antd';

import { ImageCropper } from 'components';
import React, { useState } from 'react';

import { Alert, Button, Select, useModal } from 'shared/theme/elements';
import { getBase64 } from 'shared/utils/get64Base';
import { Card, CardImage, MainContainer, PrimaryImageWrapper, TagContainer, TopContainer } from './PrimaryImage.styled';

const { Meta } = Card;
const { Title, Text } = Typography;
const { Dragger } = Upload;
const defaultSrc = '';
const PrimaryImage = () => {
  const [cropper, setCropper] = useState<any>();
  const [cropData, setCropData] = useState('https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png');
  const [image, setImage] = useState<string>(defaultSrc);
  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  const getCropData = async () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleFileChange = (info: any) => {
    getBase64(info.file, (imageUrl) => {
      setImage(imageUrl);
    });
  };

  const {
    open: openFileModal,
    isOpen: isOpenFileModal,
    modalRef: fileModalRef,
  } = useModal({
    component: (_, close) => (
      <Dragger
        name="file"
        onChange={(file) => {
          handleFileChange(file);
          close();
        }}
        beforeUpload={() => false}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>
    ),
  });

  return (
    <PrimaryImageWrapper>
      {isOpenFileModal && fileModalRef}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4}>Preview</Title>
          <Card hoverable style={{ width: 240 }} cover={<CardImage alt="example" src={cropData} />}>
            <h1>Hello</h1>
          </Card>
          <TagContainer>
            <Select label="Tags" items={[]} mode="tags" onChange={(value) => console.log(value)} />
          </TagContainer>
        </Col>
        <Col span={16}>
          <TopContainer>
            <Title level={4}>Edit Photo</Title>

            <Space>
              <Button type="ghost" onClick={() => openFileModal()}>
                Upload New Image
              </Button>
              <Button onClick={getCropData} disabled={!isValidImage}>
                Save
              </Button>
            </Space>
          </TopContainer>
          <MainContainer>
            <ImageCropper src={image} cropper={cropper} setCropper={setCropper} setIsValidImage={setIsValidImage} />
            <Text className="cropper__text">Move and scale the image until it fits within the recommended crop</Text>
          </MainContainer>
        </Col>
      </Row>
    </PrimaryImageWrapper>
  );
};

export default PrimaryImage;

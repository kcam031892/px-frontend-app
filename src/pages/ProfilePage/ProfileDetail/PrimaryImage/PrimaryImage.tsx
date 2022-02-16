import { Col, Row, Space, Typography } from 'antd';
import { ImageCropper } from 'components';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import { Button } from 'shared/theme/elements';
import { Card, CardImage, MainContainer, PrimaryImageWrapper, TopContainer } from './PrimaryImage.styled';

const { Meta } = Card;
const { Title } = Typography;
const defaultSrc = 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';
const PrimaryImage = () => {
  const [cropper, setCropper] = useState<any>();
  const [cropData, setCropData] = useState('https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png');
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <PrimaryImageWrapper>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={4}>Preview</Title>
          <Card hoverable style={{ width: 240 }} cover={<CardImage alt="example" src={cropData} />}>
            <h1>Hello</h1>
          </Card>
        </Col>
        <Col span={16}>
          <TopContainer>
            <Title level={4}>Edit Photo</Title>

            <Space>
              <Button type="ghost">Upload New Image</Button>
              <Button onClick={getCropData}>Save</Button>
            </Space>
          </TopContainer>
          <MainContainer>
            <ImageCropper src={defaultSrc} cropper={cropper} setCropper={setCropper} />
          </MainContainer>
        </Col>
      </Row>
    </PrimaryImageWrapper>
  );
};

export default PrimaryImage;

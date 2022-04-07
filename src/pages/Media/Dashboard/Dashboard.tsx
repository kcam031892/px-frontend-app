import { Box, Grid, ImageList, ImageListItem, Typography } from '@material-ui/core';
import { useWindowSize } from '@react-hook/window-size';
import { UsageData } from 'components';
import { MediaUploadIcon } from 'components/Icons';
import React, { useState, useEffect } from 'react';
import { Button } from 'themes/elements';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import qs from 'query-string';
import IMedia, { IMediaResponse, IMediaAggregatesResponse, IAggregates } from 'shared/interfaces/utils/IMedia';

import { useStyles } from './Dashboard.styles';

const Dashboard = () => {
  const classes = useStyles();
  const [width] = useWindowSize();
  const imageColl = Math.floor(((width - 240) * 8) / 12 / 180);
  const imageHeight = Math.floor(180 * 1.25);
  const { getAuthToken } = authToken();
  const { GET } = useAxios();
  const [images, setImages] = useState<IMedia[]>([]);
  const [videos, setVideos] = useState<IMedia[]>([]);
  const [audios, setAudios] = useState<IMedia[]>([]);
  const [aggregates, setAggregates] = useState<IAggregates>();

  const getFiles = async (type: string) => {
    const params = qs.stringify({
      file_type: type,
    });

    const response = await GET<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}?${params}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const getMediaAggregates = async () => {
    const response = await GET<IMediaAggregatesResponse>({
      url: `${ENDPOINTS.MEDIA}_aggregates`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  useEffect(() => {
    getFiles('image').then((images) => {
      if (!images?.data.length) return;

      setImages(images.data);
    });

    getFiles('video').then((videos) => {
      if (!videos?.data.length) return;

      setVideos(videos.data);
    });

    getFiles('audio').then((audio) => {
      if (!audio?.data.length) return;

      setAudios(audio.data);
    });

    getMediaAggregates().then((aggregates) => {
      if (!aggregates?.data) return;

      setAggregates(aggregates.data);
    });
  }, []); // eslint-disable-line

  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>Media</Typography>
        <Button variant="contained" startIcon={<MediaUploadIcon />} customVariant="newButton">
          Upload Media
        </Button>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          <Box>
            <Typography className={classes.sectionTitle}>Images</Typography>
            <ImageList rowHeight={imageHeight} cols={imageColl} gap={8} className={classes.imageList}>
              {images.map((image: IMedia) => (
                <ImageListItem key={image.id}>
                  <img src={image.attributes.attachment_url} />
                </ImageListItem>
              ))}
            </ImageList>
            {images.length === 0 && (
              <div style={{ marginTop: '5px' }}>
                <span>
                  <em>No images found.</em>
                </span>
              </div>
            )}
          </Box>
          <Box style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography className={classes.sectionTitle}>Videos</Typography>
            <ImageList rowHeight={imageHeight} cols={imageColl} gap={8} className={classes.imageList}>
              {videos.map((video: IMedia) => (
                <video width="100%" height="auto" src={video.attributes.attachment_url} controls />
              ))}
            </ImageList>
            {videos.length === 0 && (
              <div style={{ marginTop: '5px' }}>
                <span>
                  <em>No videos found.</em>
                </span>
              </div>
            )}
          </Box>
          <Box>
            <Typography className={classes.sectionTitle}>Audio</Typography>
            <Grid item xs={12} lg={8}>
              <div className={classes.grid__flex}>
                {audios.map((audio: IMedia) => (
                  <div style={{ marginBottom: '10px', marginRight: '10px' }} key={audio.id}>
                    <audio src={audio.attributes.attachment_url} controls />
                  </div>
                ))}
              </div>
            </Grid>
            {audios.length === 0 && (
              <div style={{ marginTop: '5px' }}>
                <span>
                  <em>No audios found.</em>
                </span>
              </div>
            )}
          </Box>
        </Grid>

        {/* Usage Data */}
        <Grid item xs={12} lg={4}>
          <UsageData data={aggregates} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

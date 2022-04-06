import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useWindowSize } from '@react-hook/window-size';
import { AudioEditor } from 'components';
import { ImageSliderLargeIcon, ImageSliderSmallIcon, MediaUploadIcon, SearchIcon } from 'components/Icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, Input } from 'themes/elements';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import qs from 'query-string';
import IMedia, { IMediaResponse } from 'shared/interfaces/utils/IMedia';

import { ImageSizeSlider } from '../ImagesTab/ImageSizeSlider';
import { useStyles } from './AudioTab.styles';

interface AudioListState {
  imageCol: number;
  imageHeight: number;
  imageSlider: number;
  ratio: number;
}

const AudioTab = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [width] = useWindowSize();
  const initialAudioListState: AudioListState = {
    imageSlider: 6,
    ratio: 1,
    imageCol: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  };
  const { getAuthToken } = authToken();
  const { GET } = useAxios();

  const [audioListState, setAudioListState] = useState<AudioListState>(initialAudioListState);
  const [sliderValue, setSliderValue] = useState<number>(6);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [audios, setAudios] = useState<IMedia[]>([]);

  const handleSliderValueChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      if (sliderValue !== value) {
        if (value !== audioListState.imageSlider) {
          const fact = value > audioListState.imageSlider ? 2 : 0.5;
          const ratio = fact * audioListState.ratio;

          setAudioListState({ ...audioListState, imageSlider: value, ratio });
        }
        setSliderValue(value);
      }
    }
  };

  const getAudios = async () => {
    const params = qs.stringify({
      file_type: 'audio',
    });

    const response = await GET<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}?${params}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const handleOnCloseEditor = () => {
    history.push({
      search: '',
    });
  };

  useEffect(() => {
    if (location.search) {
      if (location.search === '?edit' || location.search === '?view') {
        setIsEditorOpen(true);
      }
    }
  }, [location.search]);

  useEffect(() => {
    getAudios().then((audios) => {
      if (!audios?.data.length) return;

      setAudios(audios.data);
    });
  }, []); // eslint-disable-line

  return (
    <Box>
      {/* Top */}
      <Grid container>
        {/* Header */}
        <Grid item xs={12} lg={8}>
          <Box className={classes.header}>
            <Typography className={classes.header__title}>Audios</Typography>
          </Box>
        </Grid>
        {/* Button */}
        <Grid item xs={12} lg={4}>
          <Box className={classes.newButtonContainer}>
            <Button variant="contained" startIcon={<MediaUploadIcon />} customVariant="newButton">
              Upload New File
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Grid container spacing={10} style={{ marginTop: '2rem' }}>
        {/* Video List */}
        <Grid item xs={12} lg={8}>
          <div className={classes.grid__flex}>
            {audios.map((audio: IMedia) => (
              <div style={{ marginBottom: '10px', marginRight: '15px' }} key={audio.id}>
                <audio src={audio.attributes.attachment_url} controls />
              </div>
            ))}
          </div>
        </Grid>
        {/* Filter / Searching */}
        <Grid item xs={12} lg={4}>
          {/* Search Input */}
          <Input
            fullWidth
            placeholder={'Search'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />

          {/* Filters */}
          <Box style={{ marginTop: 24 }}>
            <Typography variant="h6">Filters</Typography>
            <RadioGroup aria-label="option" name="option" className={classes.filters__radio}>
              <FormControlLabel control={<Radio />} label="Show all Images" />
              <FormControlLabel control={<Radio />} label="Show only unused Images" />
              <FormControlLabel control={<Radio />} label="Show only untagged Images" />
            </RadioGroup>
          </Box>
          {/* Tags */}
          <Box className={classes.filters__tagContainer}>
            <Box className={classes.filters__tagHeader}>
              <Typography variant="h6">Tags</Typography>
              <IconButton title={'Clear Tags'}>
                <ClearIcon style={{ fontSize: 14 }} />
              </IconButton>
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Chip label="actors" size="small" className={classes.filters__tag} />
            </Box>
          </Box>
          {/* Allowance Progress */}
          <Box style={{ marginTop: 24 }}>
            <Box className={classes.filters__progressBar}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
                10/10 files uploaded
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                24%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={40} className={classes.filters__linearProgress} />
          </Box>
        </Grid>
      </Grid>

      {/* Dialog / Edit Image */}
      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        aria-labelledby="form-dialog-title"
        fullScreen
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <AudioEditor
            onCloseEditor={handleOnCloseEditor}
            url="https://s3-ap-southeast-2.amazonaws.com/files.au.at2casting.com/uploads/audio/69/e7/ec/5c/69e7ec5c-9250-407b-8bdd-79784f405477.mp3?AWSAccessKeyId=AKIAJMR5PKKNFE5OPUSA&Expires=1650114331&Signature=yOPFa5s2OMSpzFl%2BNG0DkiI3GbY%3D&t=202203172305316768"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AudioTab;

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInputProps,
  Chip,
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { RemoveIcon, SearchIcon } from 'components/Icons';
import { Guid } from 'guid-typescript';
import React, { useState } from 'react';
import { Input } from 'themes/elements';
import { useDebounce } from 'use-debounce';
import { useStyles } from './PrimaryImage.styles';

const PrimaryImage = () => {
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  const [autocompleteKey, setAutoCompleteKey] = useState<string>('');
  const [autoCompleteValue] = useDebounce(autocompleteKey, 500);
  const onSelectTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags((tags) => [...tags, newTag]);
    }
  };
  const onDeleteTag = (tag: string) => {
    const filteredTag = tags.filter((t) => t !== tag);
    setTags(filteredTag);
  };
  const filter = createFilterOptions<string>();
  return (
    <Grid container spacing={2}>
      <Grid>
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>

        <Card className={classes.card}>
          <CardMedia image="https://picsum.photos/200/300" className={classes.card__media} />
          <CardContent className={classes.card__content}>
            <InputBase placeholder="Enter name here" fullWidth />
            <Typography className={classes.card__text__pixels}>200 x 300 pixels</Typography>
            <Typography className={classes.card__text__primaryImage}>PRIMARY IMAGE</Typography>
          </CardContent>
        </Card>

        <Box>
          <Typography variant="h6" style={{ marginTop: '24px' }}>
            Settings
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: '24px', fontSize: '14px' }}>
            Image Tags
          </Typography>
          <Autocomplete
            options={tags}
            freeSolo={true}
            clearOnBlur={true}
            key={autoCompleteValue}
            classes={{
              root: classes.autocomplete__tagSelect,
              option: classes.autocomplete__listBoxOption,
            }}
            onChange={(_, newValue) => {
              if (newValue) {
                const regValue = newValue.replace(/"/g, '').replace(/Add\s/g, '');
                onSelectTag(regValue);
                setAutoCompleteKey(Guid.create().toString());
              }
            }}
            renderOption={(option) => option}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== '') {
                filtered.push(`Add "${params.inputValue}"`);
              }

              return filtered;
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Type and select all that apply"
                  variant="outlined"
                  InputProps={
                    {
                      ...params.InputProps,

                      endAdornment: null,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                        </InputAdornment>
                      ),
                    } as Partial<OutlinedInputProps>
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off',
                  }}
                />
              );
            }}
          />
        </Box>

        <Box className={classes.tag}>
          {tags &&
            tags.map((tag) => (
              <Chip
                key={tag}
                className={classes.tag__chip}
                deleteIcon={<RemoveIcon width="20" height="20" viewBox="0 0 20 20" fill="none" />}
                onDelete={() => onDeleteTag(tag)}
                variant="outlined"
                label={tag}
              />
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PrimaryImage;

import {
  Box,
  Chip,
  createStyles,
  InputAdornment,
  makeStyles,
  OutlinedInputProps,
  TextField,
  Theme,
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import React from 'react';
import { RemoveIcon, SearchIcon } from './Icons';
import clsx from 'clsx';

export interface TagSelectorProps {
  tags: string[];
  tagOptions: string[];
  onSelectTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagSelect: {
      marginTop: '24px',
      '& .MuiAutocomplete-inputRoot': {
        paddingTop: '8px',
        paddingBottom: '8px',
        border: 'none',
      },
      '& .MuiInputBase-input': {
        paddingTop: '3px !important',
        paddingBottom: '2px !important',
        fontSize: '14px',
      },
      '& .MuiInputBase-root.Mui-focused': {
        boxShadow: 'none !important',
      },
    },
    listBoxOption: {
      fontSize: '12px',
    },
    chip: {
      marginRight: '8px',
      marginTop: '8px',
      background: 'rgba(41, 98, 255, 0.08)',
      border: '1.5px solid rgba(41, 98, 255, 0.4)',
      color: '#2962FF',
      fontWeight: 500,
    },
  }),
);

export default function TagSelector(props: TagSelectorProps) {
  const { tagOptions, tags, onSelectTag, onDeleteTag } = props;
  const classes = useStyles();
  const filter = createFilterOptions<string>();
  return (
    <>
      <Autocomplete
        id="tag-select"
        options={tagOptions}
        classes={{
          root: classes.tagSelect,
          option: classes.listBoxOption,
        }}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => {
          if (newValue) {
            onSelectTag(newValue.replace(/"/g, '').replace(/Add\s/g, ''));
          }
        }}
        renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
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
                  disableUnderline: true,
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
                autoComplete: 'new-password',
              }}
            />
          );
        }}
      />
      <Box style={{ marginTop: '16px' }}>
        {tags &&
          tags.map((tag: string) => {
            return (
              <Chip
                key={tag}
                className={clsx(classes.chip)}
                deleteIcon={<RemoveIcon width="20" height="20" viewBox="0 0 20 20" fill="none" />}
                onDelete={() => onDeleteTag(tag)}
                variant="outlined"
                label={tag}
              />
            );
          })}
      </Box>
    </>
  );
}

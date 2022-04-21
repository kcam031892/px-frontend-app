import React, { useState, useEffect } from 'react';
import { PopoverProps, Popover, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MusicNoteOutlined, VideocamOutlined, ImageOutlined } from '@material-ui/icons';
import { IProficiencyItem } from 'shared/interfaces/IProficiency';
import IMedia from 'shared/interfaces/IMedia';
import ProficiencyData from 'data/Profeciency.json';
import { useStyles } from './SkillsPopOver.styles';

interface Props extends PopoverProps {
  onSubmitProficiency: (proficiency: IProficiencyItem) => void;
  onSelectMedia: React.MouseEventHandler<HTMLButtonElement>;
  initialProficiency: IProficiencyItem;
  selectedMedia: IMedia[];
}

const proficiencies = ProficiencyData[0].values;

const SkillsPopOver: React.FC<Props> = ({
  onSelectMedia,
  onSubmitProficiency,
  initialProficiency,
  selectedMedia,
  ...props
}) => {
  const classes = useStyles();
  const [selectedProficiency, setSelectedProficiency] = useState<string | unknown>(initialProficiency.value);

  const onProficiencySelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProficiency(e.target.value);
  };

  const renderMediaIcon = (file_type: string) => {
    switch (file_type) {
      case 'audio':
        return <MusicNoteOutlined color="action" />;

      case 'video':
        return <VideocamOutlined color="action" />;

      case 'image':
        return <ImageOutlined color="action" />;

      default:
        return <ImageOutlined color="action" />;
    }
  };

  const handleSubmit = () => {
    const proficiency = proficiencies.find((p: IProficiencyItem) => p.value === selectedProficiency);

    if (!proficiency) return;

    onSubmitProficiency(proficiency);
  };

  useEffect(() => {
    setSelectedProficiency(initialProficiency.value);
  }, [initialProficiency]);

  return (
    <div>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...props}
      >
        <Grid style={{ width: '350px', margin: '10px 20px 20px 20px' }}>
          <Grid item xs={12} md={12}>
            <FormControl margin={'normal'} fullWidth>
              <InputLabel id="lblType" shrink>
                Select Profeciency
              </InputLabel>
              <Select onChange={onProficiencySelect} labelId={'lblType'} value={selectedProficiency} disableUnderline>
                {proficiencies.map((proficiency) => (
                  <MenuItem key={proficiency.key} value={proficiency.value}>
                    {proficiency.key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div>
            {selectedMedia.length > 0 && (
              <InputLabel id="lblType" shrink style={{ margin: '5px 0px 8px 0px' }}>
                Media
              </InputLabel>
            )}
            {selectedMedia.map((media) => (
              <div className={`${classes.mediaItem}`} key={media.id}>
                <div className={`${classes.mediaText}`}>{media.attributes.file_name}</div>
                {renderMediaIcon(media.attributes.file_type)}
              </div>
            ))}
          </div>
          {selectedProficiency === 'E' && (
            <FormControl margin={'normal'} fullWidth>
              <Button variant="contained" onClick={onSelectMedia}>
                Select Media
                <input type="file" hidden />
              </Button>
            </FormControl>
          )}
          <FormControl margin={'normal'} fullWidth style={{ marginTop: 0 }}>
            <Button
              variant="contained"
              component="label"
              onClick={handleSubmit}
              disabled={selectedProficiency === 'E' && selectedMedia.length === 0}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Popover>
    </div>
  );
};

export default SkillsPopOver;

import React, { useState, useEffect } from 'react';
import { PopoverProps, Popover, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { IProficiencyItem } from 'shared/interfaces/IProficiency';
import IMedia from 'shared/interfaces/IMedia';
import ProficiencyData from 'data/Profeciency.json';

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
  const [selectedProficiency, setSelectedProficiency] = useState<string | unknown>(initialProficiency.value);

  const onProficiencySelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProficiency(e.target.value);
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
            {selectedMedia.map((media) => (
              <div key={media.id} style={{ marginBottom: 5 }}>
                {media.attributes.file_name}
              </div>
            ))}
          </div>
          <FormControl margin={'normal'} fullWidth>
            <Button variant="contained" onClick={onSelectMedia}>
              Select Media
              <input type="file" hidden />
            </Button>
          </FormControl>
          <FormControl margin={'normal'} fullWidth>
            <Button variant="contained" component="label" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Popover>
    </div>
  );
};

export default SkillsPopOver;

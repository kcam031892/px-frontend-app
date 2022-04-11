import React from 'react';
import { Popover, Button, Grid, FormControl, InputLabel, Select, MenuItem, Chip } from '@material-ui/core';
import { useSkillStyle } from 'themes/styles/useSkillStyle';

export default function BasicPopover() {
  const skillStyle = useSkillStyle();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Chip
        component="button"
        label="Californian"
        onClick={handleClick}
        onDelete={() => {}}
        avatar={<span className={skillStyle.badgeStyle}>B</span>}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid style={{ width: '350px', margin: '10px 20px 20px 20px' }}>
          <Grid item xs={12} md={12}>
            <FormControl margin={'normal'} fullWidth>
              <InputLabel id="lblType" shrink>
                Select Profeciency
              </InputLabel>
              <Select labelId={'lblType'} disableUnderline>
                <MenuItem key={'AGNC'} value={'AGNC'}>
                  Agency Representation
                </MenuItem>
                <MenuItem key={'FREE'} value={'FREE'}>
                  Freelance
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <FormControl margin={'normal'} fullWidth>
            <Button variant="contained">
              Upload File
              <input type="file" hidden />
            </Button>
          </FormControl>
          <FormControl margin={'normal'} fullWidth>
            <Button variant="contained" component="label">
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Popover>
    </div>
  );
}

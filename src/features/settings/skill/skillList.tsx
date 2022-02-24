import React from 'react';
import { SkillGroup, SkillItem } from './skillTypes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export interface SkillListProp {
  group: SkillGroup;
  onItemChange: (itemId: number, checked: boolean) => void;
}

export const SkillList = (props: SkillListProp) => {
  const subGroups = Array.from(new Set(props.group.items.map((x) => x.subGroup)));
  return (
    <Grid container spacing={2}>
      {subGroups.map((subGroupName: string, index: number) => {
        const skillItems = props.group.items.filter((x) => x.subGroup === subGroupName);
        return (
          <Grid xs={12} item key={'level' + index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {subGroupName}
                </Typography>
                <Grid container spacing={2}>
                  {skillItems.map((item: SkillItem, index: number) => {
                    return (
                      <Grid xs={6} md={3} item key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              name={'checkedC' + index}
                              checked={item.selected}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                props.onItemChange(item.id, e.target.checked);
                              }}
                            />
                          }
                          label={item.name}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

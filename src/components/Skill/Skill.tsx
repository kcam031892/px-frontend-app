import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { useSkillStyle } from 'themes/styles/useSkillStyle';
import IMedia, { IMediaResponse } from 'shared/interfaces/IMedia';
import { IProficiencyItem } from 'shared/interfaces/IProficiency';
import SkillPopOver from './SkillPopOver/SkillsPopOver';
import MediaModal, { TSelectedIds } from './MediaModal';
import SKILLS_DATA from 'data/Skills.json';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { authToken } from 'shared/utils/authToken';

import { TSkill, TSubSkills, TCurrentSkill, Props } from '.';

const Skill = ({ title, category }: Props) => {
  const cardContentStyle = useCardContentStyle();
  const skillStyle = useSkillStyle();
  const FILTERED_DATA = SKILLS_DATA.filter((item) => item.category === title);

  const [skills, setSkills] = useState<TSubSkills[]>(FILTERED_DATA);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<Element | null>(null);
  const [media, setMedia] = useState<IMedia[]>([]);
  const [selectedMediaIds, setSelectedMediaIds] = useState<TSelectedIds>([]);
  const [selectedProficiency, setSelectedProficiency] = useState<IProficiencyItem>({ key: '', value: '' });
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [currentSkill, setCurrentSkill] = useState<TCurrentSkill>();
  const [snackMessage, setSnackMessage] = useState<String | null>(null);

  const { getAuthToken } = authToken();
  const { GET, PATCH } = useAxios();

  const handleSnackBarClose = () => {
    setSnackMessage(null);
  };

  const getSubgroup = (subgroup: string) => skills.filter((x) => x.subgroup === subgroup)![0];

  const getSelectedSkills = (skills: TSkill[]) => skills.filter((skill: TSkill) => skill.is_selected);

  const getSelectedMediaIds = (skill: TSkill) => {
    if (!skill.media) return null;

    return skill.media.map((file) => file.id);
  };

  const getSelectedMediaBySelectedIds = (selectedIds: TSelectedIds) => {
    return selectedIds.map((selectedId) => {
      return media.filter((mediaItem) => mediaItem.id === selectedId)![0];
    });
  };

  const skillsTally = () =>
    skills.reduce(
      (tally, subskill) => ({
        total: tally.total + subskill.skills.length,
        selected: tally.selected + getSelectedSkills(subskill.skills).length,
      }),
      { total: 0, selected: 0 },
    );

  const updateSkill = (skills: TSkill[], newSkill: TSkill) =>
    skills.map((skill) => (skill.key === newSkill.key ? newSkill : skill));

  const resetSkill = (skillToReset: TSkill) => {
    return {
      ...skillToReset,
      is_selected: false,
      proficiency: null,
      media: null,
    };
  };

  const clearProficiencyData = () => {
    setCurrentSkill(undefined);
    setPopoverAnchorEl(null);
    setSelectedMediaIds([]);
  };

  const onToggleSkill = (subgroup: string, skill: TSkill) => {
    const skillSubgroup = getSubgroup(subgroup);

    const newSubgroupSkills = {
      ...skillSubgroup,
      skills: skillSubgroup.skills.map((prevSkill) => {
        if (prevSkill.key === skill.key) {
          const newSkill = prevSkill;

          newSkill.is_selected = !newSkill.is_selected;

          if (!prevSkill.is_selected) {
            return resetSkill(skill);
          }

          return newSkill;
        }

        return prevSkill;
      }),
    };

    setSkills((prevSkills) =>
      prevSkills.map((prevSubgroup) => {
        if (prevSubgroup.subgroup === subgroup) {
          return newSubgroupSkills;
        }

        return prevSubgroup;
      }),
    );
  };

  const onOpenPopover = (subgroup: string, skill: TSkill) => (e: React.MouseEvent) => {
    if (skill.media) {
      const newSelectedMediaIds = getSelectedMediaIds(skill);

      if (newSelectedMediaIds) {
        setSelectedMediaIds(newSelectedMediaIds);
      }
    }

    if (skill.proficiency) {
      setSelectedProficiency(skill.proficiency);
    }

    setCurrentSkill({ subgroup, skill });
    setPopoverAnchorEl(e.currentTarget);
  };

  const onClosePopover: React.MouseEventHandler<HTMLDivElement> = () => clearProficiencyData();

  const onSubmitProficiency = (proficiency: IProficiencyItem) => {
    if (!currentSkill) return;

    const selectedMedia = getSelectedMediaBySelectedIds(selectedMediaIds);
    const newSkill = {
      ...currentSkill.skill,
      proficiency,
      media: selectedMedia,
    };

    setSkills((prevSkills) =>
      prevSkills.map((item) =>
        item.subgroup === currentSkill.subgroup ? { ...item, skills: updateSkill(item.skills, newSkill) } : item,
      ),
    );

    clearProficiencyData();
  };

  const openMediaModal = () => setIsMediaModalOpen(true);
  const closeMedialModal = () => setIsMediaModalOpen(false);
  const onConfirmSelected = (selectedIds: TSelectedIds) => {
    setSelectedMediaIds(selectedIds);
    setIsMediaModalOpen(false);
  };

  const restructureData = (arrSkills: any) => {
    return {
      category: title,
      groups: arrSkills.map((data: any) => {
        return {
          name: data.subgroup,
          skills: data.skills,
        };
      }),
    };
  };

  const reconstructSkills = (arrSkills: any) => {
    const { groups = [], category = '' } = arrSkills;

    return groups.map((group: any) => ({
      category,
      subgroup: group.name,
      skills: group.skills,
    }));
  };

  const onSave: React.MouseEventHandler<HTMLButtonElement> = () => {
    const reconstructedData = restructureData(skills);

    PATCH({
      url: `${ENDPOINTS.TALENTS}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      data: {
        skills: reconstructedData,
      },
    }).then((response) => {
      setSnackMessage(response.data.message);
    });
  };

  const initializeMedia = useCallback(async () => {
    const {
      data: { data: mediaResponse = [] },
    } = await GET<IMediaResponse>({
      url: ENDPOINTS.MEDIA,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    setMedia(mediaResponse);
  }, [GET, getAuthToken]);

  const initializeSkills = useCallback(
    async (title) => {
      const {
        data: { data: skillsResponse },
      } = await GET({
        url: `${ENDPOINTS.TALENTS}/skills?category=${title}`,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const reconstructedSkills = reconstructSkills(skillsResponse.attributes.skills);

      setSkills(reconstructedSkills);
    },
    [GET, getAuthToken],
  );

  useEffect(() => {
    initializeMedia();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initializeSkills(title);
    // eslint-disable-next-line
  }, [title]);

  return (
    <Grid container className={skillStyle.contentContainer}>
      <Grid container spacing={2} className={skillStyle.headerContainer}>
        <Grid xs={12} md={6} item>
          <Typography>
            <h2>Select {title}</h2>
            <p className={skillStyle.small}>
              ({skillsTally().selected}/{skillsTally().total} selected)
            </p>
          </Typography>
        </Grid>
        <Grid xs={12} md={6} item className={skillStyle.flexRight}>
          <Button variant="outlined" onClick={initializeSkills}>
            Cancel
          </Button>
          <Button onClick={onSave} variant="contained" color="primary" className={skillStyle.btnPrimary}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        {skills.length &&
          skills.map(({ subgroup, skills: subgroupSkills }) => (
            <Card className={skillStyle.subgroup} variant="outlined" key={subgroup}>
              <CardContent className={cardContentStyle.root}>
                <Typography>
                  <h2>{subgroup}</h2>
                </Typography>
                <Grid className={skillStyle.chipContainer} item>
                  <Box className={skillStyle.selectedDisplay}>
                    {getSelectedSkills(subgroupSkills) &&
                      getSelectedSkills(subgroupSkills).map((selectedSkill) => (
                        <Chip
                          label={selectedSkill.key}
                          onClick={onOpenPopover(subgroup, selectedSkill)}
                          onDelete={() => onToggleSkill(subgroup, selectedSkill)}
                          avatar={
                            selectedSkill.proficiency?.value ? (
                              <span className={skillStyle.badgeStyle}>{selectedSkill.proficiency?.value}</span>
                            ) : (
                              <div style={{ width: 0 }} />
                            )
                          }
                          key={selectedSkill.key}
                        />
                      ))}
                  </Box>
                  <div className={skillStyle.horizontalDivider} />
                  <Box className={skillStyle.chipsDisplay}>
                    {subgroupSkills.map((skill: TSkill) => (
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        onChange={() => onToggleSkill(subgroup, skill)}
                        checked={skill.is_selected}
                        value={skill.is_selected}
                        label={skill.key}
                        key={skill.key}
                      />
                    ))}
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          ))}
      </Grid>
      <SkillPopOver
        open={!!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={onClosePopover}
        onSelectMedia={openMediaModal}
        initialProficiency={selectedProficiency}
        onSubmitProficiency={onSubmitProficiency}
        selectedMedia={getSelectedMediaBySelectedIds(selectedMediaIds)}
      />
      <MediaModal
        isOpen={isMediaModalOpen}
        media={media}
        onConfirm={onConfirmSelected}
        onCancel={closeMedialModal}
        initialSelectedIds={selectedMediaIds}
      />
      <Snackbar open={!!snackMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity="success" onClose={handleSnackBarClose}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Skill;

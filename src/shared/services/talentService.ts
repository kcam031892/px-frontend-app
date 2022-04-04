import { useMutation, useQuery } from 'react-query';
import { talentDao } from 'shared/dao/talentDao';
import { ITalentResumeResponsePayload, ITalentUpdatePayload } from 'shared/interfaces/ITalent';

const { getResume: getResumeDao, updateTalent: updateTalentDao } = talentDao();
export const talentService = () => {
  const updateTalent = () => {
    return useMutation((payload: ITalentUpdatePayload) => updateTalentDao(payload));
  };
  const getResume = () => {
    return useQuery<ITalentResumeResponsePayload>(['resume'], () => getResumeDao());
  };

  return {
    updateTalent,
    getResume,
  };
};

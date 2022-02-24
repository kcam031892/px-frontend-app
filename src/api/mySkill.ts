import axios from 'axios';
import { SkillModel } from '../features/settings/skill/skillTypes';
import { DataResult, Result } from '../types/commonTypes';

export async function getMySkill(memberId: string): Promise<SkillModel> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/skill/${memberId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<SkillModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postMySKill(mySkill: SkillModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/skill/${mySkill.memberId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const selectedItems = mySkill.groups.flatMap((x) => x.items).filter((x) => x.selected) || [];
    const response = await axios.post<Result>(url, {
      memberId: mySkill.memberId,
      skillIds: selectedItems.map((x) => x.id),
      skillLevels: selectedItems.map((x) => x.level),
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
